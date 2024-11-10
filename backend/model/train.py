# train.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from imblearn.over_sampling import SMOTENC
from sklearn.compose import ColumnTransformer
from imblearn.pipeline import Pipeline as ImbPipeline  # Import imblearn's Pipeline
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

# Load the data
data = pd.read_csv('../data/fullDB/data.csv')

# Separate features and target
X = data.drop(['Name', 'Target', 'EmployeeID', 'PatientID', ], axis=1)
y = data['Target']

# Identify categorical and numerical columns
categorical_cols = X.select_dtypes(include=['object', 'category']).columns.tolist()
numeric_cols = X.select_dtypes(include=[np.number]).columns.tolist()

# Split the data before applying SMOTENC
X_train, X_test, y_train, y_test, names_train, names_test = train_test_split(
    X, y, data['Name'], test_size=0.5, random_state=42, stratify=y
)

X_train.dtypes
# Preprocessing: Scale numerical features and encode categorical features
numeric_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore', sparse_output=False)

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_cols),
        ('cat', categorical_transformer, categorical_cols)
    ]
)

# Fit the preprocessor to determine the number of categorical features after encoding
preprocessor.fit(X_train)

# Get the new feature names after OneHotEncoding
encoded_cat_features = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_cols)
feature_names = np.concatenate([numeric_cols, encoded_cat_features])

# Determine the indices of categorical features for SMOTENC
num_numeric_features = len(numeric_cols)
num_total_features = len(feature_names)
categorical_indices = list(range(num_numeric_features, num_total_features))

# Define the pipeline with preprocessing, SMOTENC, and classifier
pipeline = ImbPipeline(steps=[
    ('preprocessor', preprocessor),
    ('smote', SMOTENC(categorical_features=categorical_indices, random_state=42, n_jobs=-1)),
    ('classifier', RandomForestClassifier(random_state=42, n_estimators=100))
])

# Train the pipeline on the training data
pipeline.fit(X_train, y_train)

# Make predictions and calculate probabilities on the test set
y_pred = pipeline.predict(X_test)
y_prob = pipeline.predict_proba(X_test)[:, 1]

# Evaluate the model
print("Classification Report:")
print(classification_report(y_test, y_pred))

print("Confusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Calculate ROC AUC Score
roc_auc = roc_auc_score(y_test, y_prob)
print(f"ROC AUC Score: {roc_auc:.4f}")

# Feature Importance
# Extract feature importances from the classifier
importances = pipeline.named_steps['classifier'].feature_importances_

# Create a DataFrame for feature importances
feature_importance_df = pd.DataFrame({
    'feature': feature_names,
    'importance': importances
}).sort_values(by='importance', ascending=False)

# Plot Feature Importances
plt.figure(figsize=(12, 8))
sns.barplot(x='importance', y='feature', data=feature_importance_df.head(20))
plt.title('Top 20 Feature Importances')
plt.tight_layout()
plt.show()

# Add probabilities to the test set and include names
# Since the preprocessor is part of the pipeline, we need to transform the test set
X_test_processed = pipeline.named_steps['preprocessor'].transform(X_test)

results = pd.DataFrame(X_test_processed, columns=feature_names)
results['Name'] = names_test.reset_index(drop=True)
results['Actual'] = y_test.reset_index(drop=True)
results['Probability_of_Death'] = y_prob
results['Dead'] = y_pred

# Mark as fraud if Probability_of_Death is between 60% and 85%
results['Fraud'] = ((results['Probability_of_Death'] >= 0.60) & 
                    (results['Probability_of_Death'] <= 0.85)).astype(int)

# Display the results
print("\nSample Prediction Probabilities:")
print(results[['Name', 'Actual', 'Fraud', 'Dead', 'Probability_of_Death']])

# Define the threshold
threshold = 0.85

# Calculate if predictions were correct based on the threshold
correct_predictions = (
    ((results['Probability_of_Death'] >= threshold) & (results['Actual'] == 1)) |
    ((results['Probability_of_Death'] < threshold) & (results['Actual'] == 0))
)

# Calculate the custom accuracy
accuracy = correct_predictions.mean() * 100
print(f"Custom Accuracy Based on 85% Threshold: {accuracy:.2f}%")

# ============================
# Separate Results into 3 Datasets
# ============================

# Define the categories based on Probability_of_Death
fraud_df = results[
    (results['Probability_of_Death'] >= 0.60) & 
    (results['Probability_of_Death'] <= 0.85)
][['Name', 'Probability_of_Death']]

cleared_df = results[
    (results['Probability_of_Death'] < 0.60)
][['Name', 'Probability_of_Death']]

dead_df = results[
    (results['Probability_of_Death'] > 0.85)
][['Name', 'Probability_of_Death']]

# Optional: Reset index for cleanliness
fraud_df = fraud_df.reset_index(drop=True)
cleared_df = cleared_df.reset_index(drop=True)
dead_df = dead_df.reset_index(drop=True)

# Display the counts for each category
print("\nCounts for Each Category:")
print(f"Fraud: {len(fraud_df)}")
print(f"Cleared: {len(cleared_df)}")
print(f"Dead: {len(dead_df)}")

# ----------------------------
# Add Desired Columns to fraud_df and cleared_df
# ----------------------------

# Define the desired columns
desired_columns = [
    "name",
    "accountNum",
    "accountType",
    "accountBalance",
    "lastTransactionDate",
    "accountStatus",
    "activeStatus",
    "dateOfBirth",
    "dateOfDeath",
    "causeOfDeath",
    "homeState",
    "stateOfLastTransaction",
    'probilityOfDeath'
]

# Function to add desired columns with default value 0
def add_missing_columns(df, desired_columns):
    for col in desired_columns:
        if col not in df.columns:
            df[col] = 0
    # Reorder the columns
    df = df[['Name', 'Probability_of_Death'] + desired_columns]
    return df

# Apply the function to fraud_df and cleared_df
fraud_df = add_missing_columns(fraud_df, desired_columns)
cleared_df = add_missing_columns(cleared_df, desired_columns)

# If you also want to apply this to dead_df, uncomment the following line
# dead_df = add_missing_columns(dead_df, desired_columns)

# Optionally, rename 'Name' column to 'name' to match desired_columns
fraud_df.rename(columns={'Name': 'name'}, inplace=True)
cleared_df.rename(columns={'Name': 'name'}, inplace=True)
# dead_df.rename(columns={'Name': 'name'}, inplace=True)

# Display the updated DataFrames
print("\nSample Fraud DataFrame:")
print(fraud_df.head())

print("\nSample Cleared DataFrame:")
print(cleared_df.head())









# Define the categories based on Probability_of_Death
# fraud_df = results[
#     (results['Probability_of_Death'] >= 0.60) & 
#     (results['Probability_of_Death'] <= 0.85)
# ][['Name', 'Probability_of_Death']]

# cleared_df = results[
#     (results['Probability_of_Death'] < 0.60)
# ][['Name', 'Probability_of_Death']]

# dead_df = results[
#     (results['Probability_of_Death'] > 0.85)
# ][['Name', 'Probability_of_Death']]

# # Optional: Reset index for cleanliness
# fraud_df = fraud_df.reset_index(drop=True)
# cleared_df = cleared_df.reset_index(drop=True)
# dead_df = dead_df.reset_index(drop=True)

# # Display the counts for each category
# print("\nCounts for Each Category:")
# print(f"Fraud: {len(fraud_df)}")
# print(f"Cleared: {len(cleared_df)}")
# print(f"Dead: {len(dead_df)}")

# # Optional: Save the datasets to CSV files
# fraud_df.to_csv('../results/fraud.csv', index=False)
# cleared_df.to_csv('../results/cleared.csv', index=False)
            
# dead_df.to_csv('../results/dead.csv', index=False)





# Save the trained pipeline
joblib.dump(pipeline, '../modelPK/death_prediction_model.pkl')

# Verify the save worked by loading and testing
loaded_pipeline = joblib.load('../modelPK/death_prediction_model.pkl')

# Make sure the loaded pipeline produces the same results
loaded_y_pred = loaded_pipeline.predict(X_test)
loaded_y_prob = loaded_pipeline.predict_proba(X_test)[:, 1]

assert np.array_equal(y_pred, loaded_y_pred), "Predictions do not match after loading the pipeline."
assert np.allclose(y_prob, loaded_y_prob), "Probabilities do not match after loading the pipeline."

print("Pipeline loaded and verified successfully.")
