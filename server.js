const express = require("express")
const mysql = require("mysql")
const fs = require("fs")
const app = express()
const port = 12236
const server = app.listen(port)
const DATA_ORIGIN_PATH = "./data/students_origin.json"
console.log("Listening on port " + port)
app.use(express.static(__dirname + "/public"))

var db = mysql.createConnection({
    host: "localhost",
    user: "winkyfac3",
    password: "eens",
    database: "injection_test"
})
db.connect(err => {
    if (err) throw err
    console.log(`MySQL database "injection_test" connected.`)
})

app.get("/list", (req, res) => {
    console.log(`/list is called`)
    db.query("SELECT * FROM students", (err, result) => {
        if (err) throw err
        let json_data = {}
        for (let person in result){
            let name = result[person].name
            let id = result[person].id
            json_data[id] = name
        }
        res.send(json_data)
    })
})

app.get("/search", (req, res) => {
    console.log(`/search is called`)
    db.query(`SELECT * FROM students WHERE id = '${req.query.id}'`, (err, result) => {
        if (err) throw err
        if (result.length != 0){
            res.send(`Hello, ${result[0].name}`)
        } else {
            res.send(`Sorry. This student ID does not exist!`)
        }
    })
})

app.get("/add", (req, res) => {
    console.log(`/add is called`)
    var id = req.query.id
    var name = req.query.name
    if (id.length > 200 || name.length > 200){
        res.send(`The student's ID or name is too long!`)
    } else {
        search_query = `SELECT * FROM students WHERE id = '${id}'`
        db.query(search_query, (err, result) => {
            if (err) throw err
            if (result.length == 0){
                insert_query = `INSERT INTO students (name, id) VALUES ('${name}', '${id}')`
                db.query(insert_query, (err, result) => {
                    if (err) throw err
                    res.send(`The student's information has been successfully added!`)
                })
            } else {
                res.send(`This student ID has already existed!`)
            }
        })
    }
})

app.get("/delete", (req, res) => {
    console.log(`/delete is called`)
    db.query(`DELETE FROM students WHERE id = '${req.query.id}'`, (err, result) => {
        if (err) throw err
        if (result.affectedRows != 0){
            res.send(`The student's information has been successfully deleted!`)
        } else {
            res.send(`Sorry. This student ID does not exist!`)
        }
    })
})

app.get("/reset", (req, res) => {
    console.log(`/reset is called`)
    db.query("DROP TABLE students", err => {
        if (err) throw err
        console.log("Table deleted.")
    })
    db.query("CREATE TABLE students (id VARCHAR(255), name VARCHAR(255))", err => {
        if (err) throw err
        console.log("Table re-created.")
    })
    var student_data = JSON.parse(fs.readFileSync(DATA_ORIGIN_PATH))
    var counter = 0
    for (let person in student_data){
        let sql_query = `INSERT INTO students (id, name) VALUES ('${person}', '${student_data[person]}')`
        db.query(sql_query, (err, result) => {
            if (err) throw err
        })
    }
    res.send("The student data have been successfully reset!")
})

// function searchByStudentID(id, data) {
//     if (id in data) return true
//     else return false
// }