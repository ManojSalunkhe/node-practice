const mysql = require('mysql');
const express = require('express');
let app = express();

app.use(express.json())

require('dotenv').config()
let HOST = process.env.HOST
let PORT = process.env.PORT
let USER = process.env.USER
let PASSWORD = process.env.PASSWORD
let DATABASE = process.env.DATABASE

// creating connection between node and MySql
let mysqlConnection = mysql.createConnection({
    host: HOST,
    port: PORT,  //MySql (databse) port
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed : ', JSON.stringify(err));
});


app.listen(3000, () => console.log('express server is running')); //this is server port


//get all emoployees
app.get('/employee', (req, res) => {
    mysqlConnection.query('SELECT * FROM testdb1.employee ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//get single emoployee
app.get('/employee/:id', (req, res) => {
    let id = req.params.id
    mysqlConnection.query('SELECT * FROM testdb1.employee WHERE emp_id = ?', id, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});



//delete employee
app.delete('/employee/:id', (req, res) => {
    let id = req.params.id
    mysqlConnection.query('DELETE FROM testdb1.employee WHERE emp_id = ?', id, (err, rows, fields) => {
        if (!err) {
            // res.send(deletedObject(id))
            // res.send('deleted successfully');
        }
        else
            console.log(err);
    })
});

//post employee
app.post('/employee', (req, res) => {
    let body = req.body
    mysqlConnection.query(`INSERT INTO testdb1.employee VALUES (?,?,?,?)`, [body.emp_id, body.emp_name, body.emp_age, body.emp_dept], (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })
})


//update employee
app.put('/employee/:id', (req, res) => {
    let body = req.body, id = req.params.id
    mysqlConnection.query('UPDATE testdb1.employee SET emp_id = ? ,emp_name = ?,emp_age = ? ,emp_dept = ? WHERE emp_id = ?', [body.emp_id, body.emp_name, body.emp_age, body.emp_dept, id], (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })
})
