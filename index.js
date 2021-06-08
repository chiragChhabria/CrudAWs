const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
   
    host: 'remotemysql.com',
    user: '2pa2DzWYm5',
    password: 'pX0H4ZusoU',
    database: '2pa2DzWYm5',
    multipleStatements: true,
    
    
    });

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


app.get('/GET' , (req, res) => {
    mysqlConnection.query('SELECT * FROM lol', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

    //Insert a record
    app.post('/CREATE', (req, res) => {
        let learner = req.body;
        var sql = "insert into lol values (?,?);"; 
        mysqlConnection.query(sql, [learner.Name, learner.Age], (err, rows, fields) => {
            if (!err)
            res.send("Record created successfully");
            else
            console.log(err);
            })
            } );

    //Get a record by name
    app.get('/GET/:id' , (req, res) => {
        mysqlConnection.query('SELECT * FROM lol WHERE name = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
        } );

    //Delete a record by name
    app.delete('/DELETE/:id' , (req, res) => {
        mysqlConnection.query('delete FROM lol WHERE name = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
        res.send("Deleted successfully");
        else
        console.log(err);
        })
        } );