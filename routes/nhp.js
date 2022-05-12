const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all nurse-patient relationships
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Nurses_has_Patients;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Nurses_has_Patients', {data: rows});                  
    })                                                      
}); 

// Create new nurse-patient relationship
router.post('/', (req, res) => {
    const data = req.body;

    const query1 = `INSERT INTO Nurses_has_Patients (nurseID, patientID) VALUES ('${data['input-nurse']}', '${data['input-pat']}')`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/nhp');
        }
    })
});

module.exports = router