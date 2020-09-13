var mysql = require("mysql");
const express = require("express");
const app = express();

const username = 'Patrick'
const name = "Patrick"
const last_name = "Star"

var con = mysql.createConnection({
  host: "localhost",
  port: "8600",
  user: "ZenUser",
  password: "@*ePEk3SwiYu&=oVuPhi",
  database: "ZenDeskApp"
});


// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Database @  docker 8600 Connected!");
// });

function DeleteTestDB()
{
  con.query(
    `DELETE FROM userdata WHERE username = '${username}'`
  )
  console.log("(TEST USER DATA WILL BE DELETED AFTER PASS)");
}

  
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
    console.log("CHECK USER : PASSED");
    if (rows.length === 0) {
      con.query(
        `INSERT INTO userdata (username, first_name, last_name) VALUES ('${username}', '${name}', '${last_name}')`,
        `DELETE FROM userdata WHERE username = '${username}'`,
        function (err, result, fields) {
          if (err) throw err;
          DeleteTestDB();
          return console.log("SET TEST : 'PASSED'");
        }
      );
    } else {
      return console.log("CHECK DUPLICATE USER : PASSED");     
    }
  }, function( errorMessage) {
    console.log("SET TEST: FAILED");
  });

  // if (DeleteUser == 'Y') {
  // con.query(
  //   `DELETE FROM userdata WHERE username = '${username}'`,
  //   function (err, result) {
  //     if (err) throw err;
  //     DeleteUser = 'N'
  //     return console.log("DELETE TEST USER : COMPLETED");
  //   }
  // );
  // }
  

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("DATABASE DOcker is listening at http://%s:%s", host, port);
});
