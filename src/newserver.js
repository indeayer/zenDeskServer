var mysql = require("mysql");
var arrayToTable = require("array-to-table");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
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
  console.log("Connected!");
});

//API CALL SECTION (POST AND SET)

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/lists", (req, res) => {
  const reqQueryObject = req.query;
  const username = req.query.username;
  con.query(`SELECT * FROM userdata`, function (err, result, fields) {
    if (result.length == 0) {
      res.send(`USER NOT FOUND`);
    } else {
      let userslist = arrayToTable(result);
      res.send(`<pre>${userslist}</pre>`);
    }
  });
});

app.get("/get", (req, res) => {
  const reqQueryObject = req.query;
  const username = req.query.username;
  con.query(`SELECT * FROM userdata where username='${username}'`, function (
    err,
    result,
    fields
  ) {
    if (result.length == 0) {
      res.send(`USER NOT FOUND`);
    } else {
      var data = result[0];
      res.send("Name: " + data.first_name + " " + data.last_name);
    }
  });
});

app.post("/set", (req, res) => {
  const reqQueryObject = req.body; // returns object with all parameters
  const username = req.body.username;
  const name = req.body.name;
  const lastname = req.body.lastname;

  // check if the username is exist, if yes, response says it's exist otherwise it will perform insert.
  function findExistingRecords() {
    return new Promise(function (resolve, reject) {
      // async
      if ("got error" == true) {
        return reject("Connection issue");
      }
      return resolve("4");
    });
  }
  
  function findExistingRecords(){

    //function findExistingRecords() {
    return new Promise(function (resolve, reject) {
      con.query(
        `SELECT * FROM userdata where username = '${username}'`,
        function (err, result, fields) {
          // Call reject on error states,
          // call resolve with results
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  };
  findExistingRecords().then(function (rows) {
    // if empty rows found, meant safe to insert
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

  //console.log(results);
  /*
  con.query(
    "SELECT * FROM userdata where username  ='" + username + "'",
    function (err, result, fields) {
      console.log(result);

      var data = result[0];

      console.log(data.username.length);

      if (data.username.length != 0) {
        res.send("USER ID ALREADY EXISTS");
      } else if (username == "" || name == "" || lastname == "") {
        console.log(result);
      } else {
        var sql =
          "INSERT INTO userdata (username, first_name, last_name) VALUES ('" +
          username +
          "', '" +
          name +
          "', '" +
          lastname +
          "')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send("Username: " + username + "was inserted");
        });
      }
    }
  );
  */
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
