const express = require("express")
const fs = require("fs")
const app = express()
const port = 12237
const server = app.listen(port)
const DATA_PATH = "./data/students.json"
const DATA_RESET_PATH = "./data/students_origin.json"
console.log("Listening on port " + port)
app.use(express.json())

// app.get("/ajax_data", (req, res) => {
//     console.log(`/ajax_data is called`)
//     res.send(`Hello, ${req.query.fname} ${req.query.lname}`)
// })

app.post("/match", (req, res) => {
    console.log(`/match is called`)
    let data = request.body
//     console.log(typeof(data))
    console.log(data)
})

app.get("/get", (req, res) => {
    console.log(`/get is called`)
})