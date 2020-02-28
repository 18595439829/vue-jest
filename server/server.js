let express = require("express");
let bodyParser = require("body-parser");
let app = new express();
let format = require("date-fns/format/index.js");

app.use(bodyParser.json()); 

let mysql = require("mysql");

let selectSQL  =  require('./query.js');
let insertSQL = require("./insert.js");
let updateSQL = require("./update.js");
let deleteSQL = require("./delete.js");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "ball"
});

connection.connect();

app.get('/search', (req, res) => {
  selectSQL(connection, req.query).then(result => {
    res.send({
      data: result,
    });
  }); 
})

app.post("/add", (req, res) => {
  insertSQL(connection, req.body).then(() => {
    res.send('添加成功');
  });
});

app.post("/update", (req, res) => {
  let { content, time, id } = {
    ...req.body
  };
  time = time
    ? format(new Date(time), "yyyy-MM-dd HH:mm:ss")
    : format(new Date(), "yyyy-MM-dd HH:mm:ss");
  let data = { content, time, id };
  updateSQL(connection, data).then(() => {
    res.send("修改成功");
  });
});

app.get("/delete", (req, res) => {
  deleteSQL(connection, req.query.id).then(() => {
    res.send("删除成功");
  });
});

app.listen(9901, function() {});

// connection.end();
