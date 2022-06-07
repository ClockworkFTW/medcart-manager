// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all prescriptions
router.get('/', async (req, res) => {  
     
    try {
        // Queries
        const select_prescriptions = "SELECT p.prescriptionID, p.issueDate, p.dosage, p.route, p.frequency, p.refills, p.prescriber, p.specialNotes, d.genericname, CONCAT(pt.patientFName, ' ', pt.patientLName ) as patientFullName from Prescriptions p, Drugs d, Patients pt where p.drugID = d.drugID and p.patientID = pt.patientID";
        const select_drugs = "SELECT drugID, genericname FROM Drugs;"
        const select_patients = "SELECT * FROM Patients;"

        // Data
        const prescriptions = await db.pquery(select_prescriptions);
        const patients = await db.pquery(select_patients);
        const drugs = await db.pquery(select_drugs);
        
        // Render
        res.render('Prescriptions', {prescriptions, patients, drugs});  
    } catch (error) {
        console.log(error)
    }
}); 

// Create new prescription
router.post('/', (req, res) => {
    
    // Data
    const {issueDate, dosage, route, frequency, refills, prescriber, specialNotes, drugID, patientID} = req.body;

    // Query
    const query1 = `INSERT INTO Prescriptions (issueDate, dosage, route, frequency, refills, prescriber, specialNotes, drugID, patientID) VALUES ('${issueDate}', '${dosage}', '${route}', '${frequency}', ${refills}, '${prescriber}', '${specialNotes}', ${drugID}, ${patientID})`;
    
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