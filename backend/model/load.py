import pandas as pd
import numpy as np

# Load data
bank_data = pd.read_csv('../data/bank/bank_data.csv')

academic_data = pd.read_csv('../data/user/academic_records.csv')
death_data = pd.read_csv('../data/user/death_records.csv')
employment_data = pd.read_csv('../data/user/employment_records.csv')
financial_data = pd.read_csv('../data/user/financial_activity.csv')
goverment_data = pd.read_csv('../data/user/goverment_benifits.csv')
healthcare_data = pd.read_csv('../data/user/healthcare_records.csv')
tax_data = pd.read_csv('../data/user/tax_records.csv')
voter_data = pd.read_csv('../data/user/voter_registration.csv')

# Load XML data
legal_records_data = pd.read_xml('../data/user/legal_recrods.xml')
social_media_activity = pd.read_xml('../data/user/social_media_activity.xml')


#JSON
utility_data = pd.read_json('../data/user/utility_usage.json')
travel_data = pd.read_json('../data/user/travel_records.json')






#Merge
datasets = [
    bank_data, academic_data, death_data, employment_data, financial_data, goverment_data,
    healthcare_data, tax_data, voter_data, legal_records_data, social_media_activity,
    utility_data, travel_data
]




merged_data = pd.DataFrame(columns=["Name"])

for dataset in datasets:
    if "Name" in dataset.columns:
        merged_data = pd.merge(merged_data, dataset, on="Name", how="outer")
        
        
#Drop Dupe Names
merged_data = merged_data.groupby("Name", as_index=False).first()

        

#Add target data
merged_data['Target'] = 0

#Change target data
names_to_set_target_one = [
    "Teresa Young", "Elizabeth Lopez", "Anthony Jackson", "Andrew Harris", "David Jones",
    "Kathleen Flores", "Aaron Jenkins", "Daniel Jackson", "Joshua Anderson", "Samantha White",
    "Ruth Martinez", "Angela Collins", "Brenda Diaz", "Brittany White", "Robert Martinez",
    "Jordan Ramirez", "Marie Allen", "Stephanie Thomas", "Kevin Garcia", "James Davis", "Megan Taylor"
]

# Set Target = 1 for the specified names
merged_data.loc[merged_data['Name'].isin(names_to_set_target_one), 'Target'] = 1



# Handle missing values
merged_data.fillna(0, inplace=True)

#To csv
merged_data.to_csv('../data/fullDB/data.csv', index=False)
