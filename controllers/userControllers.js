//initialise dependencies for user controller
const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
dotenv.config();

//connect my controller to my database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.connect();

//initialise middleware
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.getUser = (req, res) => {
    const { id } = req.params;
    const query = "SELECT first_name, last_name FROM users WHERE id = $1";
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  };
  
  exports.makeUser = (req, res) => {
    const { first_name, last_name } = req.body;
    const query =
      "INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING first_name, last_name";
    pool.query(query, [first_name, last_name], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const user = result.rows[0];
        res.status(201).json(user);
      }
    });
  };
  
  exports.patchUser = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    const query =
      "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING first_name, last_name";
    pool.query(query, [first_name, last_name, id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const user = result.rows[0];
        res.status(201).json(user);
      }
    });
  };
  
  exports.putUser = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    const query =
      "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING first_name, last_name";
    pool.query(query, [first_name, last_name, id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const user = result.rows[0];
        res.status(201).json(user);
      }
    });
  };
  
  exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = $1";
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  };
  