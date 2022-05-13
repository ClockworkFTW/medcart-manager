const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all nurse-patient relationships, nurses and patients
router.get('/', async (req, res) => {
    try {
        // Queries
        const select_nhp = "SELECT Nurses.nurseID, Nurses.nurseFName, Nurses.nurseLName, Patients.patientID, Patients.patientFName, Patients.patientLName FROM Nurses_has_Patients INNER JOIN Nurses on Nurses.nurseID = Nurses_has_Patients.nurseID INNER JOIN Patients on Patients.patientID = Nurses_has_Patients.patientID"
        const select_nurses = "SELECT nurseID, nurseFName, nurseLName from Nurses"
        const select_patients = "SELECT patientID, patientFName, patientLName from Patients"

        // Data
        const nhp = await db.pquery(select_nhp);
        const nurses = await db.pquery(select_nurses);
        const patients = await db.pquery(select_patients);
        
        // Render
        res.render('Nurses_has_Patients', {nhp, nurses, patients});  
    } catch (error) {
        console.log(error)
    }
}); 

// Create new nurse-patient relationship
router.post('/', (req, res) => {

    // Data
    const {nurseID, patientID} = req.body;

    // Query
    const create_nhp = `INSERT INTO Nurses_has_Patients (nurseID, patientID) VALUES ('${nurseID}', '${patientID}')`;
    
    // Create NHP
    db.pool.query(create_nhp, (error) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/nhp');
        }
    })
});

// Delete existing nurse-patient relationship
router.delete('/', (req, res) => {
    
    // Data
    const {nurseID, patientID} = req.query;

    // Query
    const delete_nhp = `DELETE FROM Nurses_has_Patients WHERE nurseID=${nurseID} AND patientID=${patientID}`;

    // Delete NHP
    db.pool.query(delete_nhp, (error) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })

});

module.exports = router