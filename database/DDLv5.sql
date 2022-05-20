SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Patients, Nurses, Drugs, Prescriptions, Dispenses, Nurses_has_Patients;

-- -----------------------------------------------------
-- Patients
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Patients (
	patientID INT NOT NULL AUTO_INCREMENT UNIQUE,
	patientFName VARCHAR(255) NOT NULL,
	patientLName VARCHAR(255) NOT NULL,
	dob DATE NOT NULL,
	PRIMARY KEY (patientID)
);

DESCRIBE Patients;

INSERT INTO Patients (patientFName, patientLName, dob) VALUES
	("Kitty", "Douglas", "1973-01-05"),
	("Edwin", "Bailey", "1991-03-09"),
	("Sally", "Miller", "1990-12-25"),
	("Renee", "Jordan", "1979-10-22"),
	("Brad", "Wheeler", "1997-06-05"),
	("Brent", "Wood", "1981-09-11");

SELECT * FROM Patients;

-- -----------------------------------------------------
-- Nurses
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Nurses (
	nurseID INT NOT NULL UNIQUE AUTO_INCREMENT,
	nurseFName VARCHAR(255) NOT NULL,
	nurseLName VARCHAR(255) NOT NULL,
	licenseNumber VARCHAR(255) NOT NULL,
	licenseExpiration DATE NOT NULL,
	PRIMARY KEY (nurseID)
);

DESCRIBE Nurses;

INSERT INTO Nurses (nurseFName, nurseLName, licenseNumber, licenseExpiration) VALUES
	("Louella", "Kelley", "IFGM8B", "2022-12-01"),
	("Gertrude", "Caldwell", "5TOJI8", "2023-03-06"),
	("Paul", "Stanley", "TMQ915", "2022-05-12"),
	("Jeremiah", "Jones", "SUFKA2", "2024-07-03"),
	("Mabel", "Ferguson", "66VTMA", "2022-11-11"),
	("Olivia", "Thompson", "5ERLUZ", "2023-02-04");

SELECT * FROM Nurses;

-- -----------------------------------------------------
-- Drugs
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Drugs (
	drugID INT NOT NULL UNIQUE AUTO_INCREMENT,
	genericName VARCHAR(255) NULL,
	brandName VARCHAR(255) NULL,
	description TEXT NOT NULL,
	isControlled VARCHAR(5) NOT NULL,
	strength TEXT NOT NULL,
	action TEXT NOT NULL,
	PRIMARY KEY (drugID)
);

DESCRIBE Drugs;

INSERT INTO Drugs (genericName, brandName, description, isControlled, strength, action) VALUES
(
	"Atorvastatin",
	"Lipitor",
	"White oval tablet",
    "No",
	"80mg",
	"HMG-CoA reductase inhibitor"
),
(
	"Amoxicillin",
	"Amoxil",
	"Yellow capsule",
	"No",
	"125mg/5mL",
	"antibiotic"
),
(
	"Lisinopril",
	"Prinivil",
	"Round orange tablet",
	"No",
	"40mg",
	"ACE inhibitor"
),
(
	"Levothyroxine",
	"Levoxyl",
	"Round white tablet",
	"No",
	"100mcg",
	"Thyroid hormone"
),
(
	"Albuterol",
	"Ventolin",
	"Red and white inhaler",
	"No",
	"90mcg",
	"Bronchodilator"
),
(
	"Metformin",
	"Glucophage",
	"Round white tablet",
	"No",
	"500mg",
	"Antihyperglycemic agent"
);

SELECT * FROM Drugs;

-- -----------------------------------------------------
-- Prescriptions
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Prescriptions (
	prescriptionID INT NOT NULL UNIQUE AUTO_INCREMENT,
	issueDate DATE NOT NULL,
	dosage VARCHAR(255) NOT NULL,
	route VARCHAR(255) NOT NULL,
	frequency VARCHAR(255) NOT NULL,
	refills INT(10) NOT NULL,
	prescriber VARCHAR(255) NOT NULL,
	specialNotes VARCHAR(255),
	drugID INT NOT NULL,
	patientID INT NOT NULL,
	PRIMARY KEY (prescriptionID),
	CONSTRAINT Prescriptions_Drugs
		FOREIGN KEY (drugID) REFERENCES Drugs(drugID) 
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_Prescriptions_Patients
		FOREIGN KEY (patientID) 
        REFERENCES Patients(patientID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DESCRIBE Prescriptions;

INSERT INTO Prescriptions (issueDate, dosage, route, frequency, refills, prescriber, drugID, patientID) VALUES
	("2022-03-02", "40mg", "oral", "twice a day", 5, "Annika Bannon, MD", (SELECT drugID FROM Drugs WHERE genericName = "Atorvastatin"), (SELECT patientID FROM Patients WHERE patientFName = "Kitty" and patientLName = "Douglas")),
	("2022-12-05", "200mg/5mL", "oral", "once a day", 12, "Joyce Bellin, PA-C", (SELECT drugID FROM Drugs WHERE genericName = "Amoxicillin"), (SELECT patientID FROM Patients WHERE patientFName = "Edwin" and patientLName = "Bailey")),
	("2022-05-11", "10mg", "oral", "twice a day", 6, "Jessica Berman, MD", (SELECT drugID FROM Drugs WHERE genericName = "Lisinopril"), (SELECT patientID FROM Patients WHERE patientFName = "Sally" and patientLName = "Miller")),
	("2022-04-07", "125mcg", "oral", "twice a week", 2, "Thomas Cacciola, MD", (SELECT drugID FROM Drugs WHERE genericName = "Levothyroxine"), (SELECT patientID FROM Patients WHERE patientFName = "Renee" and patientLName = "Jordan")),
	("2022-06-10", "90mcg", "inhalation", "twice a day", 15, "Kathleen Campbell, PA-C", (SELECT drugID FROM Drugs WHERE genericName = "Albuterol"), (SELECT patientID FROM Patients WHERE patientFName = "Brad" and patientLName = "Wheeler")),
	("2022-10-01", "850mg", "oral", "once a week", 2, "Nicholas Crocetta, PharmD", (SELECT drugID FROM Drugs WHERE genericName = "Metformin"), (SELECT patientID FROM Patients WHERE patientFName = "Brent" and patientLName = "Wood"));

SELECT * FROM Prescriptions;

-- -----------------------------------------------------
-- Dispenses
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Dispenses (
	dispenseID INT NOT NULL UNIQUE AUTO_INCREMENT,
	dispenseDate DATE NOT NULL,
	prescriptionID INT NOT NULL,
	nurseID INT,
	PRIMARY KEY (dispenseID),
    CONSTRAINT fk_Dispenses_Presc 
		FOREIGN KEY (prescriptionID) 
		REFERENCES Prescriptions(prescriptionID)
        ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (nurseID) REFERENCES Nurses(nurseID) 
		ON DELETE CASCADE 
		ON UPDATE CASCADE
);

DESCRIBE Dispenses;

INSERT INTO Dispenses (dispenseDate, prescriptionID, nurseID) VALUES
	("2022-03-12", 1, (SELECT nurseID FROM Nurses WHERE nurseFName = "Louella" and nurseLName = "Kelley")),
	("2022-12-13", 2, (SELECT nurseID FROM Nurses WHERE nurseFName = "Gertrude" and nurseLName = "Caldwell")),
	("2022-05-20", 3, (SELECT nurseID FROM Nurses WHERE nurseFName = "Paul" and nurseLName = "Stanley")),
	("2022-04-18", 4, (SELECT nurseID FROM Nurses WHERE nurseFName = "Jeremiah" and nurseLName = "Jones")),
	("2022-06-23", 5, (SELECT nurseID FROM Nurses WHERE nurseFName = "Mabel" and nurseLName = "Ferguson")),
	("2022-10-08", 6, (SELECT nurseID FROM Nurses WHERE nurseFName = "Olivia" and nurseLName = "Thompson"));

SELECT * FROM Dispenses;

-- -----------------------------------------------------
-- Nurses_has_Patients
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Nurses_has_Patients (
	nurseID INT NOT NULL,
	patientID INT NOT NULL,
	PRIMARY KEY (nurseID, patientID),
	CONSTRAINT fk_Nurses_has_Patients_Nurse
		FOREIGN KEY (nurseID)
		REFERENCES Nurses(nurseID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_Nurses_has_Patients_Patient
		FOREIGN KEY (patientID)
		REFERENCES Patients(patientID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

DESCRIBE Nurses_has_Patients;

INSERT INTO Nurses_has_Patients (nurseID, patientID) VALUES
	((SELECT nurseID FROM Nurses WHERE nurseFName = "Louella" and nurseLName = "Kelley"), (SELECT patientID FROM Patients WHERE patientFName = "Kitty" and patientLName = "Douglas")),
	((SELECT nurseID FROM Nurses WHERE nurseFName = "Gertrude" and nurseLName = "Caldwell"), (SELECT patientID FROM Patients WHERE patientFName = "Edwin" and patientLName = "Bailey")),
	((SELECT nurseID FROM Nurses WHERE nurseFName = "Paul" and nurseLName = "Stanley"), (SELECT patientID FROM Patients WHERE patientFName = "Sally" and patientLName = "Miller")),
	((SELECT nurseID FROM Nurses WHERE nurseFName = "Jeremiah" and nurseLName = "Jones"), (SELECT patientID FROM Patients WHERE patientFName = "Renee" and patientLName = "Jordan")),
	((SELECT nurseID FROM Nurses WHERE nurseFName = "Mabel" and nurseLName = "Ferguson"), (SELECT patientID FROM Patients WHERE patientFName = "Brad" and patientLName = "Wheeler")),
	((SELECT nurseID FROM Nurses WHERE nurseFName = "Olivia" and nurseLName = "Thompson"), (SELECT patientID FROM Patients WHERE patientFName = "Brent" and patientLName = "Wood"));

SELECT * FROM Nurses_has_Patients;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;