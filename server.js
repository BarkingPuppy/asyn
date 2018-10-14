const express = require("express")
const fs = require("fs")
const app = express()
const port = 12236
const server = app.listen(port)
const DATA_PATH = "./data/students.json"
const DATA_RESET_PATH = "./data/students_origin.json"
console.log("Listening on port " + port)
app.use(express.static(__dirname + "/public"))

// app.get("/ajax_data", (req, res) => {
//     console.log(`/ajax_data is called`)
//     res.send(`Hello, ${req.query.fname} ${req.query.lname}`)
// })

app.get("/list", (req, res) => {
    console.log(`/list is called`)
    fs.readFile(DATA_PATH, (err, data) => res.send(JSON.parse(data)))
})

app.get("/search", (req, res) => {
    console.log(`/search is called`)
    fs.readFile(DATA_PATH, (err, data) => {
        if (err) throw err
        let id = req.query.id
        let student_data = JSON.parse(data)
        if (searchByStudentID(id, student_data)){
            res.send(`Hello, ${student_data[id]}`)
        } else {
            res.send(`Sorry. This student ID does not exist!`)
        }
    })
})

app.get("/add", (req, res) => {
    console.log(`/add is called`)
    fs.readFile(DATA_PATH, (err, data) => {
        if (err) throw err
        let id = req.query.id
        let name = req.query.name
        let student_data = JSON.parse(data)
        if (searchByStudentID(id, student_data)){
            res.send(`This student ID has already existed!`)
        } else {                
            student_data[id] = name
            fs.writeFile(DATA_PATH, JSON.stringify(student_data), (err) => {
                if (err) throw err
                res.send(`The student's information has been successfully added!`)
            })
        }
    })
})

app.get("/delete", (req, res) => {
    console.log(`/delete is called`)
    fs.readFile(DATA_PATH, (err, data) => {
        if (err) throw err
        let id = req.query.id
        let student_data = JSON.parse(data)
        if (searchByStudentID(id, student_data)){
            delete student_data[id]
            fs.writeFile(DATA_PATH, JSON.stringify(student_data), (err) => {
                if (err) throw err
                res.send(`The student's information has been successfully deleted!`)
            })
        } else {
            res.send(`Sorry. This student ID does not exist!`)
        }        
    })
})

app.get("/reset", (req, res) => {
    console.log(`/reset is called`)
    fs.copyFile(DATA_RESET_PATH, DATA_PATH, err => {
        if (err) throw err
        res.send(`The student data have been successfully reset!`)
    })
})

function searchByStudentID(id, data) {
    if (id in data) return true
    else return false
}