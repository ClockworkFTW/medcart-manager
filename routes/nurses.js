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
router.post('/', (req, res) => {
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

// Update nurse license
router.put('/put-nurse-ajax', (req,res,next) => {
    const data = req.body;

    const queryUpdateWorld = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    const selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`
  
    // Run the 1st query
    db.pool.query(queryUpdateWorld, [homeworld, person], (error, rows, fields) => {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            db.pool.query(selectWorld, [homeworld], (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
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