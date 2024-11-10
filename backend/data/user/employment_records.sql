CREATE TABLE Employees (
    Name VARCHAR(100),
    EmployeeID INT PRIMARY KEY,
    Position VARCHAR(100),
    Salary DECIMAL(10,2)
);

INSERT INTO Employees (Name, EmployeeID, Position, Salary) VALUES
('Michael Williams', 2003, 'Project Manager', 90000.00),
('Ashley Wilson', 2006, 'Data Scientist', 95000.00),
('James Davis', 2009, 'Network Administrator', 78000.00),
('Jessica Hernandez', 2010, 'Customer Support', 48000.00);
