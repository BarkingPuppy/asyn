const mysql = require("mysql")
const fs = require("fs")
const DATA_ORIGIN_PATH = "./data/students_origin.json"
var db = mysql.createConnection({
    host: "localhost",
    user: "winkyfac3",
    password: "eens",
    database: "injection_test"
})

db.query("CREATE TABLE students (id VARCHAR(255), name VARCHAR(255))", err => {
    if (err) throw err
    console.log("Table created.")
})
var student_data = JSON.parse(fs.readFileSync(DATA_ORIGIN_PATH))
var counter = 0
for (let person in student_data){
    sql_query = `INSERT INTO students (id, name) VALUES ('${person}', '${student_data[person]}')`
    db.query(sql_query, (err, result) => {
        if (err) throw err
        counter = counter + result.affectedRows
    })
}
console.log(`Number of records inserted: ${counter}`)