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
router.delete('/:patientID', (req, res, next) => {

    // FIX: fk constraint causing error on delete

    const patientID = parseInt(req.params.patientID);

    const deletePatients_pat = `DELETE FROM Patients WHERE patientID = ${patientID}`;
    const deleteNHP_pat= `DELETE FROM Nurses_has_Patients WHERE patientID = ${patientID}`;
    const deletePres_pat= `DELETE FROM Prescriptions WHERE patientID = ${patientID}`;

    db.pool.query(deletePatients_pat, [patientID], (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(deleteNHP_pat, [patientID], (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(deletePres_pat, [patientID], (error, rows, fields) => {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(204);
                        }
                    })
                }
            })
        }
    })
});

module.exports = router