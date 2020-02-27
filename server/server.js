let express = require("express");
let app = new express();

let mysql = require("mysql");

let selectSQL  =  require('./query.js');
let insertSQL = require("./insert.js");


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "ball"
});

connection.connect();

app.get('/search', (req, res) => {
  console.log(req.query);
  selectSQL(connection, req.query).then(result => {
    console.log("result", result);
    res.send(result);
  }); 
})

app.post("/add", (req, res) => {
  console.log(req.body);
  selectSQL(connection).then(result => {
    console.log("result", result);
    res.send(result);
  });
});

app.listen(8081, function() {});

connection.end();
