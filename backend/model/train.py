import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from imblearn.over_sampling import SMOTENC
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

# Load the data
data = pd.read_csv('../data/fullDB/data.csv')

# Separate features and target
X = data.drop(['Name', 'Target'], axis=1)
y = data['Target']

# Identi    fy categorical and numerical columns
categorical_cols = X.select_dtypes(include=['object', 'category']).columns.tolist()
numeric_cols = X.select_dtypes(include=[np.number]).columns.tolist()

# Split the data before applying SMOTENC
X_train, X_test, y_train, y_test, names_train, names_test = train_test_split(
    X, y, data['Name'], test_size=0.5, random_state=42, stratify=y
)

# Preprocessing: Scale numerical features and encode categorical features
numeric_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore', sparse_output=False)

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# Fit and transform the training data
X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)

# Get the new feature names after OneHotEncoding
encoded_cat_features = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_cols)
feature_names = np.concatenate([numeric_cols, encoded_cat_features])

# Handle class imbalance with SMOTENC
# SMOTENC requires the indices of the categorical features in the transformed data
# Since OneHotEncoder expands categorical features, we need to find their indices
num_numeric_features = len(numeric_cols)
num_total_features = X_train_processed.shape[1]
categorical_indices = list(range(num_numeric_features, num_total_features))

smote_nc = SMOTENC(categorical_features=categorical_indices, random_state=42, n_jobs=-1)

X_resampled, y_resampled = smote_nc.fit_resample(X_train_processed, y_train)

# Train the model
model = RandomForestClassifier(random_state=42, n_estimators=100)
model.fit(X_resampled, y_resampled)

# Predictions and Probabilities
y_pred = model.predict(X_test_processed)
y_prob = model.predict_proba(X_test_processed)[:, 1]

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
importances = model.feature_importances_

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
results = pd.DataFrame(X_test_processed, columns=feature_names)
results['Name'] = names_test.reset_index(drop=True)
results['Actual'] = y_test.reset_index(drop=True)

results['Probability_of_Death'] = y_prob
# Mark as fraud if Probability_of_Death is between 30% and 85%
results['Fraud'] = ((results['Probability_of_Death'] >= 0.60) & 
                    (results['Probability_of_Death'] <= 0.85)).astype(int)

# Display the results

print("\nSample Prediction Probabilities:")
print(results[['Name', 'Actual', 'Fraud', 'Probability_of_Death']])

# Threshold for determining "correct" predictions
# Define the threshold
threshold = 0.85

# Calculate if predictions were correct based on the threshold
# If Probability_of_Death >= threshold and Actual == 1, it's considered correct.
# If Probability_of_Death < threshold and Actual == 0, it's also considered correct.
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

# Optional: Save the datasets to CSV files
fraud_df.to_csv('../results/fraud.csv', index=False)
cleared_df.to_csv('../results/cleared.csv', index=False)
dead_df.to_csv('..//results/dead.csv', index=False)

# # Save the trained model and preprocessor
# model_dir = '../models/'
# os.makedirs(model_dir, exist_ok=True)
# model_path = os.path.join(model_dir, 'death_prediction_model.pkl')

# # Save both the preprocessor and model using a Pipeline
# full_pipeline = Pipeline(steps=[
#     ('preprocessor', preprocessor),
#     ('classifier', model)
# ])

# joblib.dump(full_pipeline, model_path)
# print("Model training completed and saved as 'death_prediction_model.pkl'.")
