var mysql = require("mysql");
const express = require("express");
const assert = require("assert");
//
const username = "Patrick";
const name = "Patrick";
const last_name = "Star";

var con = mysql.createConnection({
  host: "localhost",
  port: "8500",
  user: "ZenUser",
  password: "@*ePEk3SwiYu&=oVuPhi",
  database: "ZenDeskApp",
});

function findExistingRecords() {
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
}

describe("#database function()", function () {
  it("succesfully insert", function () {
    findExistingRecords().then(
      function (rows) {
        if (rows.length === 0) {
          con.query(
            `INSERT INTO userdata (username, first_name, last_name) VALUES ('${username}', '${name}', '${last_name}')`,
            `DELETE FROM userdata WHERE username = '${username}'`,
            function (err, result, fields) {
              assert.ok(err ? false : true);
            }
          );
        } else {
          assert.ok(true);
        }
      },
      function (errorMessage) {
        assert.ok(false);
      }
    );
  });
  it("succesfully delete", function () {
    con.query(`DELETE FROM userdata WHERE username = '${username}'`, function (err, result, fields) {
      if (err){
        assert.ok(false);
      } else {
        assert.ok(true);
      };
    });
  });
});
