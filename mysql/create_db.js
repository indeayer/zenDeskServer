var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "8000",
  user: "ZenUser",
  password: "@*ePEk3SwiYu&=oVuPhi"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE IF NOT EXISTS TESTTEST", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  let useDB = "USE TESTTEST";

  con.query(useDB, function(err, results, fields) {
    if (err) {
    console.log(err.message);
    }
});

    
    let createTodos = `create table if not exists userdata(
        id int primary key auto_increment,
        user_name varchar(100)not null,
        first_name varchar(100)not null,
        last_name varchar(100)not null
    )`;
    con.query(createTodos, function(err, results, fields) {
        if (err) {
        console.log(err.message);
        }
    });

    con.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});