const mysql = require('mysql2')
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    port :  process.env.DB_PORT,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = pool.promise();