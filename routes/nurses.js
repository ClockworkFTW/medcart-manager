const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all nurses
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Nurses;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Nurses', {data: rows});                  
    })                                                      
}); 


// Create new nurse
router.post('/create', (req, res) => {
    const {fname, lname, licnum, licexp} = req.body;

    const query1 = `INSERT INTO Nurses (nurseFName, nurseLName, licenseNumber, licenseExpiration) VALUES ('${fname}', '${lname}', '${licnum}','${licexp}')`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/nurses');
        }
    })
});

// Update existing nurse
router.post('/update', (req, res) => {
    
    // Data
    const {nurseID, licnum, licexp} = req.body;

    // Query
    const update_nurse = `UPDATE Nurses SET licenseNumber = '${licnum}', licenseExpiration = '${licexp}' WHERE nurseID = ${nurseID}`;

    // Update Nurse
    db.pool.query(update_nurse, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/nurses');
        }
    })
});


// Delete existing nurse
router.delete('/:nurseID', (req, res) => {

    // Data
    const nurseID = parseInt(req.params.nurseID);

    // Query
    const delete_nurse = `DELETE FROM Nurses WHERE nurseID=${nurseID}`;

    // Delete Nurse
    db.pool.query(delete_nurse, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);   
        }
    })

});

module.exports = router