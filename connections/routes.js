// This is the routes.js file!

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'food_finder'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});


// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();
app.use(cors());

// Creating a GET route that returns data from the 'auth' table.
app.get('/auth', function (req, res) {
    // Connecting to the database.
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM auth', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        return res.send(err);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      else {
        return res.json({
          data: results
        });
      };
    });
});

// Creating a GET route that returns data from the 'users' table.
app.get('/items', function (req, res) {
  // Connecting to the database.
  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM items', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) {
      return res.send(err);
    }

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    else {
      return res.json({
        data: results
      });
    };
  });
});


// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/ so you can see the data.');
});