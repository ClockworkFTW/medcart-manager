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

    const query1 = `INSERT INTO Prescriptions (issueDate, dosage, route, frequency, refills, prescriber, specialNotes, drugID, patientID) VALUES ('${issueDate}', '${dosage}', '${route}','${frequency}', ${refills},'${prescriber}', '${specialNotes}',${drugID}, ${patientID})`;
    
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
    
    // Data
    const prescriptionID = parseInt(req.params.prescriptionID);

    // Query
    const delete_prescription = `DELETE FROM Prescriptions WHERE prescriptionID=${prescriptionID}`;

    // Delete Prescription
    db.pool.query(delete_prescription, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);   
    }
    })

});

module.exports = router