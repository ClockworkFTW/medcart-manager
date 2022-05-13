const mysql = require('mysql')

// Import database config
const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD} = process.env

// Configure database connection
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : DB_HOST,
    database        : `${DB_NAME}_${DB_USER}`,
    user            : `${DB_NAME}_${DB_USER}`, 
    password        : DB_PASSWORD,
});

// Test database connection
pool.getConnection((error) => {
    if (error) {
        throw error
    }

    console.log(`Connected to database at ${DB_HOST} as ${DB_NAME}_${DB_USER}.`)
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