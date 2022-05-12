const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all prescriptions
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Prescriptions;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Prescriptions', {data: rows});                  
    })                                                      
}); 

// Create new prescription
router.post('/', (req, res) => {
    const {issueDate, dosage, route, frequency, refills, prescriber, specialNotes, drugID, patientID} = req.body;

    console.log(req.body)

    const query1 = `INSERT INTO Prescriptions (issueDate, dosage, route, frequency, refills, prescriber, specialNotes, drugID, patientID) VALUES ('${issueDate}', '${dosage}', '${route}','${frequency}', ${refills},'${doctor}', '${specialNotes}',${drugID}, ${patientID})`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/prescriptions');
        }
    })
});

// Delete existing prescripton
router.delete('/:prescriptionID', (req, res) => {

    const prescriptionID = parseInt(req.params.prescriptionID);
    console.log(prescriptionID);
    res.sendStatus(200);

    // TODO: delete from database

});

module.exports = router