const mysql = require('mysql-await');
const express = require('express');
let app = express();

app.use(express.json())

require('dotenv').config()
let HOST = process.env.HOST
let PORT = process.env.PORT
let USER = process.env.USER
let PASSWORD = process.env.PASSWORD
let DATABASE = process.env.DATABASE

const dbConfig = {
    host: HOST,
    port: PORT,  //MySql (databse) port
    user: USER,
    password: PASSWORD,
    database: DATABASE
}
const mysqlConnection = mysql.createConnection(dbConfig)

// const connect = () => {
//     return new Promise((resolve, reject) => {
//         mysqlConnection.on('error', (err) => {
//             if (!err)
//                 console.log('success')
//             else
//                 console.log('failed')
//         })
//     })
// }



app.listen(3000, () => console.log('express server is running')); //this is server port


//get all emoployees
app.get('/employee', async (req, res) => {
    try {
        const result = await mysqlConnection.awaitQuery('SELECT * FROM testdb1.employee');
        res.status(200).send(result)
    } catch (err) {
        console.log({ err })
        res.status(500).send(err.message);
    }
});

// //get single emoployee
app.get('/employee/:id', async (req, res) => {
    let id = req.params.id
    try {
        const result = await mysqlConnection.awaitQuery('SELECT * FROM testdb1.employee WHERE emp_id = ?', id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// //delete employee
app.delete('/employee/:id', async (req, res) => {
    let id = req.params.id
    try {
        const result = await mysqlConnection.awaitQuery('DELETE FROM testdb1.employee WHERE emp_id = ?', id)
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// //post employee
app.post('/employee', async (req, res) => {
    let body = req.body
    try {
        const result = await mysqlConnection.awaitQuery(`INSERT INTO testdb1.employee VALUES (?,?,?,?)`,
            [body.emp_id, body.emp_name, body.emp_age, body.emp_dept])
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// //update employee
app.put('/employee/:id', async (req, res) => {
    let body = req.body, id = req.params.id
    try {
        const result = await mysqlConnection.awaitQuery('UPDATE testdb1.employee SET emp_id = ? ,emp_name = ?,emp_age = ? ,emp_dept = ? WHERE emp_id = ?',
            [body.emp_id, body.emp_name, body.emp_age, body.emp_dept, id])
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
