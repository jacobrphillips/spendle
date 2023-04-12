//initialise dependencies for budget controller
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

exports.getBudget = (req, res) => {
    const { id } = req.params;
    const query = `SELECT budget_total FROM budgets WHERE budget_id = $1`;
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  }

exports.makeBudget = (req, res) => {
    const { id } = req.params;
    const { budget_total } = req.body;
    const query =
      "INSERT INTO budgets (budget_total) VALUES ($1) RETURNING budget_total";
    pool.query(query, [budget_total], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const budget = result.rows[0];
        res.status(201).send(budget);
      }
    });
  }
  

exports.patchBudget = (req, res) => {
    const { id } = req.params;
    const { budget_total } = req.body;
    const query = "UPDATE budgets SET budget_total = $1";
    pool.query(query, [budget_total, id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const budget = result.rows[0];
        res.status(201).json(budget);
      }
    });
  }

exports.putBudget = (req, res) => {
    const { id } = req.params;
    const { budget_total } = req.body;
    const query = "UPDATE budgets SET budget_total = $1 WHERE budget_id = $2";
    pool.query(query, [budget_total, id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const budget = result.rows[0];
        res.status(201).json(budget);
      }
    });
  }

exports.deleteBudget = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM budgets WHERE budget_id = $1";
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }
