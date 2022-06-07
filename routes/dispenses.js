// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router()

const db = require('../database/db-connector')

// Get all dispense events
router.get('/', async (req, res) => {  
    try { 
        // Queries
        const select_dispenses = "SELECT * FROM Dispenses"
        const select_nurses = "SELECT nurseID, nurseFName, nurseLName from Nurses"

        // Data 
        const nurses = await db.pquery(select_nurses);
        let dispenses = await db.pquery(select_dispenses);

        dispenses = dispenses.map(d => {
            const nurse = nurses.find(n => n.nurseID === d.nurseID);
            return {...d, ...nurse}
        })

        // Render
        res.render('Dispenses', {dispenses, nurses});  
    } catch (error) {
        console.log(error)
    }
}); 

// Create new dispense event
router.post('/', (req, res) => {
    const data = req.body;

    console.log(data)

    var query1 = `INSERT INTO Dispenses (dispenseDate, prescriptionID, nurseID) VALUES ('${data['input-date']}', '${data['input-pID']}', '${data['input-nID']}')`;
    
    if (data['input-nID'] == " ") {
        query1 = `INSERT INTO Dispenses (dispenseDate, prescriptionID, nurseID) VALUES ('${data['input-date']}', '${data['input-pID']}', NULL)`;
    }

    console.log(query1)
    
    db.pool.query(query1, (error, rows) => {
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

    // Data
    const dispenseID = parseInt(req.params.dispenseID);

    // Query
    const delete_dispense = `DELETE FROM Dispenses WHERE dispenseID=${dispenseID}`;

    // Delete Dispense
    db.pool.query(delete_dispense, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);   
    }
    })

});

module.exports = router