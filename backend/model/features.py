import pandas as pd
import numpy as np
from datetime import datetime

# Load the merged data
merged_data = pd.read_csv('../data/fullDB/data.csv')

# Convert date columns to datetime
date_columns = [
    'Date of Birth', 'Date of Death', 'Last Transaction Date_x', 'Last Transaction Date_y',
    'LastClaimDate', 'LastAppointmentDate', 'Last Filed Year', 'Last Voted Date',
    'LastCourtAppearance', 'LastLoginDate', 'Last Payment Date', 'Last Travel Date',
    'employment_start_date', 'employment_end_date', 'Enrollment Date', 'Graduation Date',
    'Account Open Date'
]
for col in date_columns:
    if col in merged_data.columns:
        merged_data[col] = pd.to_datetime(merged_data[col], errors='coerce')

# Create 'declared_dead' feature from 'Date of Death'
merged_data['declared_dead'] = merged_data['Date of Death'].notnull().astype(int)

# Feature Engineering

# Binary features indicating the presence of records
merged_data['has_employment_record'] = merged_data['EmployeeID'].notnull().astype(int)
merged_data['has_student_record'] = merged_data['Student ID'].notnull().astype(int)
merged_data['has_benefit_record'] = merged_data['BenefitType'].notnull().astype(int)
merged_data['has_tax_record'] = merged_data['Taxpayer ID'].notnull().astype(int)
merged_data['has_voter_record'] = merged_data['Voter ID'].notnull().astype(int)
merged_data['has_court_record'] = merged_data['CaseNumber'].notnull().astype(int)
merged_data['has_online_activity'] = merged_data['LastLoginDate'].notnull().astype(int)
merged_data['has_utility_usage'] = (
    merged_data['Electricity Usage'].notnull() | merged_data['Water Usage'].notnull()
).astype(int)
merged_data['has_travel_record'] = merged_data['Passport Number'].notnull().astype(int)
merged_data['has_healthcare_record'] = merged_data['PatientID'].notnull().astype(int)
merged_data['has_social_media_activity'] = merged_data['Username'].notnull().astype(int)

# Anomaly features
merged_data['large_account_balance'] = (merged_data['Account Balance_x'] > 5000).astype(int)
merged_data['anomaly_large_balance_no_employment'] = (
    (merged_data['large_account_balance'] == 1) & (merged_data['has_employment_record'] == 0)
).astype(int)

# Calculate days since last transaction
reference_date = pd.to_datetime('2023-10-15')  # Replace with current date if needed

merged_data['days_since_last_transaction'] = (
    reference_date - merged_data['Last Transaction Date_x']
).dt.days

# New Features Added

# 1. Temporal Activity Trends

# Days since last healthcare interaction
if 'LastAppointmentDate' in merged_data.columns:
    merged_data['days_since_last_healthcare'] = (
        reference_date - merged_data['LastAppointmentDate']
    ).dt.days
    merged_data['days_since_last_healthcare'] = merged_data['days_since_last_healthcare'].fillna(9999)

# Frequency of transactions per year
if 'Transaction Count' in merged_data.columns:
    # Assuming 'Transaction Count' is the total number of transactions
    # and 'Account Open Date' is available
    if 'Account Open Date' in merged_data.columns:
        merged_data['Account Open Date'] = pd.to_datetime(merged_data['Account Open Date'], errors='coerce')
        merged_data['account_age_days'] = (reference_date - merged_data['Account Open Date']).dt.days
        merged_data['transactions_per_year'] = merged_data['Transaction Count'] / (merged_data['account_age_days'] / 365.25)
    else:
        merged_data['transactions_per_year'] = merged_data['Transaction Count']  # Fallback if no account age

# 2. Financial Consistency and Patterns

# Transaction Variability
if 'Monthly Balances' in merged_data.columns:
    # Assuming 'Monthly Balances' is a list or string of balances
    merged_data['balance_std_dev'] = merged_data['Monthly Balances'].apply(
        lambda x: np.std([float(i) for i in str(x).split(',')]) if pd.notnull(x) else 0
    )
else:
    merged_data['balance_std_dev'] = 0

# Income-to-Balance Ratio
if 'Salary' in merged_data.columns:
    merged_data['income_to_balance_ratio'] = merged_data['Salary'] / (merged_data['Account Balance_x'] + 1)
else:
    merged_data['income_to_balance_ratio'] = 0

# Employment Duration
if 'employment_start_date' in merged_data.columns and 'employment_end_date' in merged_data.columns:
    merged_data['employment_duration_days'] = (
        merged_data['employment_end_date'] - merged_data['employment_start_date']
    ).dt.days
    merged_data['employment_duration_days'] = merged_data['employment_duration_days'].fillna(0)
else:
    merged_data['employment_duration_days'] = 0

# 3. Social Media and Online Presence

# Days since last social media activity
if 'LastLoginDate' in merged_data.columns:
    merged_data['days_since_last_online_activity'] = (
        reference_date - merged_data['LastLoginDate']
    ).dt.days
    merged_data['days_since_last_online_activity'] = merged_data['days_since_last_online_activity'].fillna(9999)
else:
    merged_data['days_since_last_online_activity'] = 9999

# Online activity frequency
if 'PostsLastYear' in merged_data.columns:
    merged_data['online_activity_frequency'] = merged_data['PostsLastYear'] / 365.25
else:
    merged_data['online_activity_frequency'] = 0

# 4. Health and Medical History Patterns

# Frequency of medical claims
if 'Total Medical Claims' in merged_data.columns:
    merged_data['medical_claims_per_year'] = merged_data['Total Medical Claims'] / (
        merged_data['days_since_last_healthcare'] / 365.25 + 1
    )
else:
    merged_data['medical_claims_per_year'] = 0

# Chronic conditions flag
chronic_conditions = ['Heart Disease', 'Cancer', 'Diabetes', 'Stroke', 'Old Age', 'Accident', 'Pneumonia', 'Heart Failure']
if 'Cause of Death' in merged_data.columns:
    merged_data['has_chronic_condition'] = merged_data['Cause of Death'].apply(
        lambda x: 1 if pd.notnull(x) and x in chronic_conditions else 0
    )
else:
    merged_data['has_chronic_condition'] = 0

# 5. Utility and Travel Patterns

# Average utility usage
merged_data['average_utility_usage'] = (
    merged_data[['Electricity Usage', 'Water Usage']].mean(axis=1)
)
merged_data['average_utility_usage'] = merged_data['average_utility_usage'].fillna(0)

# Utility usage variability
merged_data['utility_usage_variability'] = (
    merged_data[['Electricity Usage', 'Water Usage']].std(axis=1)
)
merged_data['utility_usage_variability'] = merged_data['utility_usage_variability'].fillna(0)

# International travel flag
if 'Destination' in merged_data.columns:
    domestic_countries = ['USA', 'United States', 'United States of America']
    merged_data['international_travel'] = merged_data['Destination'].apply(
        lambda x: 0 if x in domestic_countries else 1 if pd.notnull(x) else 0
    )
else:
    merged_data['international_travel'] = 0

# 6. Cross-Record Consistency Checks

# Inconsistent record flags
merged_data['inconsistent_financial_records'] = (
    (merged_data['has_tax_record'] == 1) &
    (merged_data['has_employment_record'] == 0) &
    (merged_data['Account Balance_x'] == 0)
).astype(int)

# Unusual travel with zero utility usage
merged_data['travel_no_utility'] = (
    (merged_data['international_travel'] == 1) &
    (merged_data['average_utility_usage'] == 0)
).astype(int)

# 7. Age and Demographic-Based Features

# Calculate age
if 'Date of Birth' in merged_data.columns:
    merged_data['age'] = (reference_date - merged_data['Date of Birth']).dt.days / 365.25
    merged_data['age'] = merged_data['age'].fillna(0)
else:
    merged_data['age'] = 0

# Age group
def age_group(age):
    if age < 18:
        return 'Underage'
    elif 18 <= age < 35:
        return 'Young Adult'
    elif 35 <= age < 65:
        return 'Adult'
    elif age >= 65:
        return 'Senior'
    else:
        return 'Unknown'

merged_data['age_group'] = merged_data['age'].apply(age_group)

# Retirement age flag
merged_data['is_retired'] = (merged_data['age'] >= 65).astype(int)

# One-hot encode age groups
merged_data = pd.get_dummies(merged_data, columns=['age_group'], drop_first=True)

# 8. Anomaly Detection in Records

# Lack of recent financial activity + recent tax record
merged_data['anomaly_tax_no_financial_activity'] = (
    (merged_data['has_tax_record'] == 1) &
    (merged_data['days_since_last_transaction'] > 365)
).astype(int)

# 9. Derived Financial Metrics

# Change in account balance over time
if 'Previous Account Balance' in merged_data.columns:
    merged_data['account_balance_change'] = (
        merged_data['Account Balance_x'] - merged_data['Previous Account Balance']
    ) / (merged_data['Previous Account Balance'] + 1)
else:
    merged_data['account_balance_change'] = 0

# Debt-to-Income Ratio
if 'Total Debt' in merged_data.columns and 'Salary' in merged_data.columns:
    merged_data['debt_to_income_ratio'] = merged_data['Total Debt'] / (merged_data['Salary'] + 1)
else:
    merged_data['debt_to_income_ratio'] = 0

# 10. Last Activity Date Across All Records

# Latest activity date
activity_date_columns = [
    'Last Transaction Date_x', 'LastAppointmentDate', 'LastLoginDate',
    'Last Payment Date', 'Last Travel Date', 'Last Voted Date', 'LastCourtAppearance'
]
existing_activity_date_columns = [col for col in activity_date_columns if col in merged_data.columns]

merged_data['latest_activity_date'] = merged_data[existing_activity_date_columns].max(axis=1)
merged_data['days_since_last_activity'] = (reference_date - merged_data['latest_activity_date']).dt.days
merged_data['days_since_last_activity'] = merged_data['days_since_last_activity'].fillna(9999)

# Encoding Categorical Variables
if 'Overdraft Status' in merged_data.columns:
    merged_data['Overdraft Status'] = merged_data['Overdraft Status'].map({'Yes': 1, 'No': 0})
if 'Active Status' in merged_data.columns:
    merged_data['Active Status'] = merged_data['Active Status'].map({'Yes': 1, 'No': 0})

# One-hot encode 'Account Type' if it exists
if 'Account Type' in merged_data.columns:
    merged_data = pd.get_dummies(merged_data, columns=['Account Type'], drop_first=True)

# Include 'declared_dead' as a feature
feature_columns = [
    'declared_dead',
    'Account Balance_x',
    'Overdraft Status',
    'Active Status',
    'has_employment_record',
    'has_student_record',
    'has_benefit_record',
    'has_tax_record',
    'has_voter_record',
    'has_court_record',
    'has_online_activity',
    'has_utility_usage',
    'has_travel_record',
    'has_healthcare_record',
    'has_social_media_activity',
    'anomaly_large_balance_no_employment',
    'days_since_last_transaction',
    'days_since_last_healthcare',
    'transactions_per_year',
    'balance_std_dev',
    'income_to_balance_ratio',
    'employment_duration_days',
    'days_since_last_online_activity',
    'online_activity_frequency',
    'medical_claims_per_year',
    'has_chronic_condition',
    'average_utility_usage',
    'utility_usage_variability',
    'international_travel',
    'inconsistent_financial_records',
    'travel_no_utility',
    'age',
    'is_retired',
    'anomaly_tax_no_financial_activity',
    'account_balance_change',
    'debt_to_income_ratio',
    'days_since_last_activity',
] + [col for col in merged_data.columns if 'Account Type_' in col] + \
    [col for col in merged_data.columns if 'age_group_' in col]

# Ensure all feature columns exist in merged_data
feature_columns = [col for col in feature_columns if col in merged_data.columns]

# Create the features DataFrame
features = merged_data[feature_columns].copy()

# Handle missing values
features.fillna(0, inplace=True)

# Save the features to a CSV file
features.to_csv('../data/fullDB/featuresDB.csv', index=False)

print("Feature engineering completed. Features saved to '../data/fullDB/featuresDB.csv'.")
