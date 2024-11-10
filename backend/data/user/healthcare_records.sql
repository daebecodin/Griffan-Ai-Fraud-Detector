CREATE TABLE Patients (
    Name VARCHAR(100),
    PatientID INT PRIMARY KEY,
    LastAppointmentDate DATE,
    ActivePrescriptions INT
);

INSERT INTO Patients (Name, PatientID, LastAppointmentDate, ActivePrescriptions) VALUES
('Michael Williams', 3003, '2023-09-15', 2),
('Ashley Wilson', 3006, '2023-10-02', 1),
('James Davis', 3007, '2023-08-18', 3),
('Jessica Hernandez', 3010, '2023-07-30', 2);
