﻿CREATE TABLE ONGs (
	Id INTEGER PRIMARY KEY,
	Email TEXT NOT NULL UNIQUE,
	Password TEXT NOT NULL,
	Name TEXT NOT NULL,
	CNPJ TEXT NOT NULL,
	Category TEXT NOT NULL,
	Mission TEXT NOT NULL,
	Actions TEXT NOT NULL, 
	Cause TEXT NOT NULL
)

CREATE TABLE Volunteers (
	VolunId INTEGER PRIMARY KEY,
	VolunEmail TEXT NOT NULL UNIQUE,
	VolunPassword TEXT NOT NULL,
	VolunName TEXT NOT NULL,
	VolunCPF TEXT NOT NULL,
	VolunBirthDate TEXT NOT NULL
)

CREATE TABLE ONGVolunteers (
	ONGVolunId INTEGER PRIMARY KEY AUTOINCREMENT,
	OngId INTEGER NOT NULL,
	VolunteerId INTEGER NOT NULL,
	VolunteerApproved INTEGER NOT NULL,
	FOREIGN KEY (OngId) REFERENCES ONGs(Id)
		ON DELETE CASCADE,
	FOREIGN KEY (VolunteerId) REFERENCES Volunteers(VolunId)
		ON DELETE CASCADE
)

CREATE TABLE Projects (
	Id INTEGER PRIMARY KEY,
	Name TEXT NOT NULL,
	Goal TEXT NOT NULL,
	Category TEXT NOT NULL,
	Expertise TEXT NOT NULL,
	Infrastructure TEXT NOT NULL,
	VolunteerId INTEGER NOT NULL,
	FOREIGN KEY (VolunteerId) REFERENCES Volunteers(VolunId)
		ON DELETE CASCADE
)