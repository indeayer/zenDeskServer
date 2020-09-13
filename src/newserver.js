var mysql = require("mysql");
const log = require('simple-node-logger').createSimpleLogger('log/app.log');
//const winston = require('winston');
var arrayToTable = require("array-to-table");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
log.setLevel('trace');
//const logger = require("./config/winston.js");

app.use(bodyParser.urlencoded({ extended: true }));


var con = mysql.createConnection({
  host: "ZenDeskDB",
  port: "3306",
  user: "ZenUser",
  password: "@*ePEk3SwiYu&=oVuPhi",
  database: "ZenDeskApp"
});

con.connect(function (err) {
  if (err) throw err;
}); 


function log_it(req, method, url, message){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.info(`${ip} - - [${new Date().toJSON()}] "${method} ${url} - - ${message}"`);
}

//Query CALL SECTION (POST AND SET)

app.get("/", function (req, res) {
  log_it(req, "GET", "/", "Connected to index.html");
  res.sendFile(__dirname + "/index.html"); //If User go default link divert to index.html
});


//Get function to search for username.
app.get("/get", (req, res) => {  
  
  const reqQueryObject = req.query;
  const username = req.query.username;
  log_it(req, "GET", "/get", `Search username '${username}'`);
  //Promise when reject shows error , when approve call function.
  function searchForUser(){
    return new Promise(function (resolve, reject){
      //log.info('Connected to server at ', new Date().toJSON());
      con.query(`SELECT * FROM userdata where username='${username}'`,
      function (err, result ,fields){
        if (err){
          return reject (err);
        }
        resolve(result);
      }
      );
    });
  };
  
  //Function call (rows = result of data)
  searchForUser().then(function(rows){
    if (rows.length == 0){
      res.send ("User not Found");
    } else {
      return res.send (`Name: ${rows[0].first_name} ${rows[0].last_name}`)
    }
  }, function( errorMessage) {
    console.log(errorMessage);
  })
});


app.post("/set", (req, res) => {
  const reqQueryObject = req.body; // returns object with all parameters
  const username = req.body.username;
  const name = req.body.name;
  const lastname = req.body.lastname;
  log_it(req, "POST", "/set", `Create new username '${username}'`);
  // // check if the username is exist, if yes, response says it's exist otherwise it will perform insert.
  // function findExistingRecords() {
  //   return new Promise(function (resolve, reject) {
  //     // async
  //     if ("got error" == true) {
  //       return reject("Connection issue");
  //     }
  //     return resolve("4");
  //   });
  // }
  
  function findExistingRecords(){
    return new Promise(function (resolve, reject) {
      con.query(
        `SELECT * FROM userdata where username = '${username}'`,
        function (err, result, fields) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  };
  
  findExistingRecords().then(function (rows) {
    // if empty rows found, Insert User
    if (rows.length === 0) {
      con.query(
        `INSERT INTO userdata (username, first_name, last_name) VALUES ('${username}', '${name}', '${lastname}')`,
        function (err, result, fields) {
          if (err) throw err;
          return res.send(`The "${username}" username has succesfully insert.`);
        }
      );
    } else {
      return res.send(
        `Creation failure. The username: "${username}" was exist.`
      );
    }
  }, function( errorMessage) {
    console.log(errorMessage);
  });
});
  
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
