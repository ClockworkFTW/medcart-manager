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
router.post('/add-drug-form', (req, res) => {
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

    const drugID = parseInt(req.params.drugID);
    console.log(drugID);
    res.sendStatus(200);

    // TODO: delete from database

});

module.exports = router