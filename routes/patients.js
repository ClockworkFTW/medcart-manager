// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all patients
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Patients;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Patients', {data: rows});                  
    })                                                      
});

// Create new patient
router.post('/', (req, res) => {
    const {fname, lname, dob} = req.body;

    const query1 = `INSERT INTO Patients (patientFName, patientLName, dob) VALUES ('${fname}', '${lname}', '${dob}')`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/patients');
        }
    })
});

// Delete existing patient
router.delete('/:patientID', (req, res) => {

    // Data
    const patientID = parseInt(req.params.patientID);

    // Query
    const delete_patient = `DELETE FROM Patients WHERE patientID=${patientID}`;

    // Delete Patient
    db.pool.query(delete_patient, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);   
        }
    })

});

module.exports = router