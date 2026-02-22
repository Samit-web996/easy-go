const mysql = require('mysql2')
// console.log("DB User:", process.env.DB_USER);


const conn = mysql.createConnection({
    user : 'root' ,
    host : 'localhost',
    port : 3306,
    database : 'easygo',
    password : 'Bobby@1234'
});

conn.connect((err)=>{
    if(err){
        console.log("Error..." , err.message)
    }
    else{console.log('Database Connecteddd!!!')}
});

module.exports = conn;