/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const process = require('process');
const app = new express();
const format = require("date-fns/format/index.js");

app.use(morgan('short'));
app.use(bodyParser.json()); 

const mysql = require("mysql");

const selectSQL  =  require('./query.js');
const insertSQL = require("./insert.js");
const updateSQL = require("./update.js");
const deleteSQL = require("./delete.js");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "ball",
  connectionLimit: 0,
});

connection.connect();

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});

app.get('/search', (req, res) => {
  selectSQL(connection, req.query).then(result => {
    res.send({
      total: result[0],
      data: result[1],
    });
    res.end();
    // connection.release();//释放链接
  }).catch(err=> {
    res.end(err);
  }); 
})

app.post("/add", (req, res) => {
  insertSQL(connection, req.body).then(() => {
    res.send('添加成功');
    res.end();
  }).catch(err=> {
    res.end(err);
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
    res.end();
  }).catch(err=> {
    res.end(err);
  });
});

app.get("/delete", (req, res) => {
  deleteSQL(connection, req.query.id).then(() => {
    res.send("删除成功");
    res.end();
  }).catch(err=> {
    res.end(err);
  });
});

app.listen(9901, function() {});

// connection.end();
