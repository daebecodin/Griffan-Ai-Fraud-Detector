CREATE TABLE BenefitClaims (
    Name VARCHAR(100),
    BenefitType VARCHAR(100),
    LastClaimDate DATE,
    Status VARCHAR(20)
);

INSERT INTO BenefitClaims (Name, BenefitType, LastClaimDate, Status) VALUES
('Michael Williams', 'Housing', '2023-09-05', 'Active'),
('Ashley Wilson', 'Education Grant', '2023-09-30', 'Active'),
('James Davis', 'Healthcare Subsidy', '2023-08-12', 'Active'),
('Jessica Hernandez', 'Housing', '2023-07-28', 'Active');
