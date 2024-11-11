import pandas as pd
import joblib
import numpy as np

# Load the saved pipeline model
full_pipeline = joblib.load('../modelPK/death_prediction_model.pkl')

# Load the actual data and training data for comparison
actual_data = pd.read_csv('../data/fullDB/data.csv')
training_data = pd.read_csv('../data/fullDB/data.csv')

# Print distribution of Target in training data
print("\nTraining Data Target Distribution:")
print(training_data['Target'].value_counts())

# Ensure that the 'Name' column is dropped, as it is not part of the features
X_actual = actual_data.drop(['Name', 'Target', 'EmployeeID', 'PatientID'], axis=1)

# Convert numeric columns to appropriate type
numeric_columns = X_actual.select_dtypes(include=['int64', 'float64']).columns
for col in numeric_columns:
    X_actual[col] = pd.to_numeric(X_actual[col], errors='coerce')

# Fill NaN values with column means
X_actual = X_actual.fillna(X_actual.mean())

# Convert categorical columns to string type
categorical_columns = X_actual.select_dtypes(include=['object']).columns
for col in categorical_columns:
    X_actual[col] = X_actual[col].astype(str)

# Use the pipeline to predict
predicted_probabilities = full_pipeline.predict_proba(X_actual)[:, 1]

# Since Target=1 means death, we should REVERSE our probability interpretation
# Higher probability should indicate death (Target=1)
results = pd.DataFrame({
    'Name': actual_data['Name'],
    'Probability_of_Death': predicted_probabilities
})

# Print probability distribution
print("\nProbability Distribution:")
print(pd.Series(predicted_probabilities).describe())

# Categorize results (adjusting thresholds since higher prob means death)
dead_df = results[results['Probability_of_Death'] > 0.85]
fraud_df = results[(results['Probability_of_Death'] >= 0.60) & 
                   (results['Probability_of_Death'] <= 0.85)]
cleared_df = results[results['Probability_of_Death'] < 0.60]

# Save categorized results
print("\nSample of highest probability cases:")
print(results.nlargest(5, 'Probability_of_Death')[['Name', 'Probability_of_Death']])

print("\nSample of lowest probability cases:")
print(results.nsmallest(5, 'Probability_of_Death')[['Name', 'Probability_of_Death']])

print("\nFinal Category Counts:")
print(f"Dead (prob > 0.85): {len(dead_df)}")
print(f"Fraud (prob 0.60-0.85): {len(fraud_df)}")
print(f"Cleared (prob < 0.60): {len(cleared_df)}")

# Save the detailed results
results.to_csv('../results/detailed_prediction_results.csv', index=False)
fraud_df.to_csv('../results/fraud.csv', index=False)
cleared_df.to_csv('../results/cleared.csv', index=False)
dead_df.to_csv('../results/dead.csv', index=False)

# Additional validation
print("\nValidation Checks:")
print(f"Total predictions: {len(results)}")
print(f"Sum of all categories: {len(dead_df) + len(fraud_df) + len(cleared_df)}")
print(f"Number of probabilities > 0.5: {(predicted_probabilities > 0.5).sum()}")