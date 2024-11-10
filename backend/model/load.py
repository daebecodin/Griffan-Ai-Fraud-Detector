import pandas as pd
import numpy as np
from faker import Faker

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



#load execution data
fake = Faker()

def generate_complete_fake_data():
    return {
        'Name': fake.name(),
        'Unique ID': fake.uuid4(),
        'Account Type': fake.random_element(elements=['Checking', 'Savings', 'Credit']),
        'Account Balance_x': round(fake.random_number(digits=5) + fake.pyfloat(right_digits=2, positive=True), 2),
        'Last Transaction Date_x': fake.date_between(start_date='-5y', end_date='today').isoformat(),
        'Overdraft Status': fake.random_element(elements=['Yes', 'No']),
        'Active Status': fake.random_element(elements=['Yes', 'No']),
        'Student ID': fake.random_int(min=100000, max=999999),
        'Major': fake.random_element(elements=['Computer Science', 'Biology', 'Mathematics', 'History']),
        'GPA': round(fake.pyfloat(left_digits=1, right_digits=2, positive=True, min_value=2.0, max_value=4.0), 2),
        'Date of Birth': fake.date_of_birth(minimum_age=18, maximum_age=90).isoformat(),
        'Date of Death': fake.random_element(elements=[None, fake.date_this_year().isoformat()]),
        'Cause of Death': fake.random_element(elements=['Natural Causes', 'Accident', 'Illness', None]),
        'EmployeeID': fake.uuid4(),
        'Position': fake.job(),
        'Salary': round(fake.random_number(digits=5) + fake.pyfloat(right_digits=2, positive=True), 2),
        'Account Number': f"ACC{fake.random_number(digits=5, fix_len=True)}",
        'Last Transaction Date_y': fake.date_between(start_date='-5y', end_date='today').isoformat(),
        'Account Balance_y': round(fake.random_number(digits=5) + fake.pyfloat(right_digits=2, positive=True), 2),
        'BenefitType': fake.random_element(elements=['Healthcare', 'Unemployment', 'Disability']),
        'LastClaimDate': fake.date_between(start_date='-5y', end_date='today').isoformat(),
        'Status': fake.random_element(elements=['Active', 'Inactive']),
        'PatientID': fake.uuid4(),
        'LastAppointmentDate': fake.date_between(start_date='-1y', end_date='today').isoformat(),
        'ActivePrescriptions': fake.random_int(min=0, max=5),
        'Taxpayer ID': fake.ssn(),
        'Last Filed Year': fake.random_int(min=2015, max=2023),
        'Tax Libaility': round(fake.random_number(digits=4) + fake.pyfloat(right_digits=2, positive=True), 2),
        'Voter ID': fake.uuid4(),
        'Last Voted Date': fake.date_between(start_date='-4y', end_date='today').isoformat(),
        'Registration Status': fake.random_element(elements=['Registered', 'Not Registered']),
        'CaseNumber': fake.uuid4(),
        'LastCourtAppearance': fake.date_between(start_date='-5y', end_date='today').isoformat(),
        'CaseStatus': fake.random_element(elements=['Open', 'Closed', 'Pending']),
        'Username': fake.user_name(),
        'LastLoginDate': fake.date_between(start_date='-1y', end_date='today').isoformat(),
        'PostsLastYear': fake.random_int(min=0, max=50),
        'Address': fake.address(),
        'Electricity Usage': round(fake.random_number(digits=4) + fake.pyfloat(right_digits=2, positive=True), 2),
        'Water Usage': round(fake.random_number(digits=3) + fake.pyfloat(right_digits=2, positive=True), 2),
        'Last Payment Date': fake.date_between(start_date='-1y', end_date='today').isoformat(),
        'Passport Number': f"P{fake.random_number(digits=8, fix_len=True)}",
        'Last Travel Date': fake.date_between(start_date='-2y', end_date='today').isoformat(),
        'Destination': fake.country(),
        'Target': fake.random_element(elements=[0] * 8 + [1] * 2)
    }

synthetic_data = pd.DataFrame([generate_complete_fake_data() for _ in range(200)])

synthetic_data.to_csv('../modelPK/real_data.csv', index=False)
