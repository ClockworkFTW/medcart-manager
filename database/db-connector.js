const mysql = require('mysql')

const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD} = process.env

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : DB_HOST,
    database        : `${DB_NAME}_${DB_USER}`,
    user            : `${DB_NAME}_${DB_USER}`, 
    password        : DB_PASSWORD,
});

pool.getConnection((error) => {
    if (error) {
        throw error
    }

    console.log(`Connected to database at ${DB_HOST} as ${DB_NAME}_${DB_USER}.`)
})

module.exports.pool = pool;