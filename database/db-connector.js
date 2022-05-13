const mysql = require('mysql')
const fs = require('fs')

// Import seed query
const seed_db = fs.readFileSync("database/DDLv5.sql", {encoding: "utf-8"})

// Import database config
const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD} = process.env

// Configure database connection
const pool = mysql.createPool({
    connectionLimit    : 10,
    multipleStatements : true,
    host               : DB_HOST,
    database           : `${DB_NAME}_${DB_USER}`,
    user               : `${DB_NAME}_${DB_USER}`, 
    password           : DB_PASSWORD,
});

// Test database connection and seed
pool.getConnection((error) => {
    if (error) {
        console.log(error)
    } else {
        pool.query(seed_db, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Connected to database at ${DB_HOST} as ${DB_NAME}_${DB_USER}.`)
            }                 
        })      
    }
})

// Promisify database pool query
module.exports.pquery = sql => new Promise((resolve, reject) => {
    pool.query(sql, (error, rows) => {
        if (error) {
            reject(error);
        } else {
            resolve(rows.map(row => Object.assign({}, row)));
        }
    });
});

module.exports.pool = pool;