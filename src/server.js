const http = require('http')
const express = require('express')
const app = express()
const port = 8100
const mysql = require('mysql')

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'ZenUser';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || '@*ePEk3SwiYu&=oVuPhi';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'ZenDeskApp';

// Create the connection with required details
const con = mysql.createConnection({
  host, user, password, database,
});

const query = "SELECT * FROM userdata";
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;

  // if connection is successful
  con.query(query, (err, result, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;

    // if there is no error, you have the result
    console.log(result);
 });
});


app.get('/get/:username', function (req, res) {
   connection.query('select * from userdata where username=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

