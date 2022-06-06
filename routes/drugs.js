// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all drugs
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Drugs;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Drugs', {data: rows});                  
    })                                                      
}); 

// Create new drug
router.post('/', (req, res) => {
    const {genericName, brandName, description, isControlled, strength, action} = req.body;
    
    const query1 = `INSERT INTO Drugs (genericName, brandName, description, isControlled, strength, action) VALUES ('${genericName}', '${brandName}', '${description}','${isControlled}', '${strength}', '${action}')`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/drugs');
        }
    })
});

// Delete existing drug
router.delete('/:drugID', (req, res) => {

    // Data
    const drugID = parseInt(req.params.drugID);

    // Query
    const delete_drug = `DELETE FROM Drugs WHERE drugID=${drugID}`;

    // Delete Drug
    db.pool.query(delete_drug, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);   
    }
    })

});

module.exports = router