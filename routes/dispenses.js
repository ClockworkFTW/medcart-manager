const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all dispense events
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Dispenses;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Dispenses', {data: rows});                  
    })                                                      
}); 

// Create new dispense event
router.post('/', (req, res) => {
    const data = req.body;

    const query1 = `INSERT INTO Dispenses (dispenseDate, prescriptionID, nurseID) VALUES ('${data['input-date']}', '${data['input-pID']}', '${data['input-nID']}')`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/dispenses');
        }
    })
});

// Delete existing dispense event
router.delete('/:dispenseID', (req, res) => {

    const dispenseID = parseInt(req.params.dispenseID);
    console.log(dispenseID);
    res.sendStatus(200);

    // TODO: delete from database

});

module.exports = router