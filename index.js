const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.post('/users', (req, res) => {
    const body = req.body;
    connection.query(
        'INSERT INTO `persons`(`LastName`, `FirstName`, `Address`, `City`) VALUES (?, ?, ?, ?)',
        [body.LastName, body.FirstName, body.Address, body.City],
        (err, results) => {
            res.json(results);
        }
    );
})
app.put('/users', (req, res,) => {
    const body = req.body;
    connection.query(
        'UPDATE `persons` SET `LastName`= ?, `FirstName`= ?, `Address`= ?, `City`= ? WHERE PersonID = ?',
        [body.LastName, body.FirstName, body.Address, body.City, body.id],
        (err, results) => {
            res.json(results);
        }
    );
})
app.delete('/users', function (req, res) {
    connection.query(
        'DELETE FROM `persons` WHERE PersonID = ?',
        [req.body.id],
        (err, results) => {
            res.json(results);
        }
    );
})

app.get('/users', function (_, res) {
    connection.query(
        'SELECT * FROM `persons`',
        (err, results) => {
            res.json(results);
        }
    );
})
app.get('/users/:id',  (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `persons` WHERE `PersonID` = ?',
        [id],
         (err, results) => {
            res.json(results);
        }
    );
})

app.listen(5000, function () {
    console.log('web server listening on port 5000')
})