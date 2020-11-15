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
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(cors());
// Creating a GET route that returns data from the 'users' table.
app.get('/auth', function (req, res) {
    // Connecting to the database.
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        return res.send(error);
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      else {
        return res.json({
          data: results
        });
      };
    });
});

// Creating a GET route that returns data from the 'Admin' table.
app.get('/admin', function (req, res) {
  // Connecting to the database.
  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM admin', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) {
      return res.send(error);
    }

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    else {
      return res.json({
        data: results
      });
    };
  });
});

// Creating a GET route that returns data from the 'items' table.
app.get('/items', function (req, res) {
  // Connecting to the database.
  // Executing the MySQL query (select all data from the 'users' table).
  connection.query('SELECT * FROM items', function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) {
      return res.send(error);
    }

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    else {
      return res.json({
        data: results
      });
    };
  });
});


// Creating a POST route that creates an order and returns data from the 'itemOrder' table.
app.post('/createOrder', function (req, res) {
  // Connecting to the database.
  // Executing the MySQL query (select all data from the 'users' table).
  connection.query(`Insert into transaction values('${req.headers.custid.toString()}',NULL)`, function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) {
      return res.send(error);
      console.log(error)
    }

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    else {
      connection.query(`Insert into itemOrder values('4','${results.insertId.toString()}')`, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) {
          return res.send(error);
          console.log(error)
        }
    
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        else {
          return res.json({
            data: results
          });
        };
      });/* 
      return res.json({
        data: results
      }); */
    };
  });

  
  
  console.log(req.body);
});

// Starting our server.
app.listen(3090, () => {
 console.log('Go to http://localhost:3090/ so you can see the data.');
});