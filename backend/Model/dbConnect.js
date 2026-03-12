const mysql = require('mysql2')
const dotenv = require('dotenv');

dotenv.config();

const conn = mysql.createConnection({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    port :  process.env.DB_PORT,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD
});

conn.connect((err)=>{
    if(err){
        console.log("Error..." , err.message)
    }
    else{console.log('Database Connecteddd!!!')}
});

module.exports = conn;