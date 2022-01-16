const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

db.connect()

app.get('/api/sections', (req, res) => {
    let sql = `CALL rollcall.sp_GetSections();`
    db.query(sql, true, (error, results, fields) => {
        if (error) {
            res.send(console.error(error.message))
        }
        res.send(results[0])
    })
})

app.get('/api/students', (req, res) => {
    const sectionID = req.query.sectionID

    let sql = `CALL rollcall.sp_getStudents(${sectionID});`
    db.query(sql, true, (error, results) => {
        if (error) {
            res.send(console.error(error.message))
        }
        res.send(results[0])
    })
})

app.get('/api/insert', (req, res) => {
    const studentID = req.query.studentID
    const sectionID = req.query.sectionID

    const sql = `CALL rollcall.sp_StudentAttend(1, ${studentID}, ${sectionID})`
    db.query(sql, true, (error, results) => {
        if (error) {
            res.send(console.error(error.message))
        }
        res.send(results[0])
    })
})

app.get('/api/delete', (req, res) => {
    const studentID = req.query.studentID

    const sql = `CALL rollcall.sp_StudentAttend(0, ${studentID}, 0)`
    db.query(sql, true, (error, results, fields) => {
        if (error) {
            res.send(console.error(error.message))
        }
        res.send(results[0])
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})