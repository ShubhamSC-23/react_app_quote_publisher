const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "W2_89604_Shubham",
    password: "manager",
    database: "quotes_db"
})

module.exports = pool