//initialise dependencies for expense controller
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

exports.getExpense = (req, res) => {
    const { id } = req.params;
    const query =
      "SELECT expense_name, expense_amount FROM expenses WHERE expense_id = $1";
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(result.rows[0]);
      }
    });
  }


exports.makeExpense = (req, res) => {
    const { id } = req.params;
    const { expense_name, expense_amount } = req.body;
    const query =
      "INSERT INTO expenses (expense_name, expense_amount) VALUES ($1, $2) RETURNING expense_id, expense_name, expense_amount";
    pool.query(query, [expense_name, expense_amount], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const expenses = result.rows[0];
        res.status(201).send(expenses);
      }
    });
  }

exports.patchExpense = (req, res) => {
    const { id } = req.params;
    const { expense_id, expense_name, expense_amount } = req.body;
    const query =
      "UPDATE expenses SET expense_name = COALESCE($1, expense_name), expense_amount = COALESCE($2, expense_amount) WHERE expense_id = $3 RETURNING *";
    pool.query(query, [expense_name || null, expense_amount || null, expense_id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const newExpense = result.rows[0]
        res.send(newExpense);
      }
    });
  }

exports.putExpense = (req, res) => {
    const { id } = req.params;
    const { expense_name, expense_amount } = req.body;
    const query =
      "UPDATE expenses SET expense_name = $1, expense_amount = $2 WHERE expense_id = $3";
    pool.query(query, [expense_name, expense_amount, id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const expenses = result.rows[0];
        res.status(201).send(expenses);
      }
    });
  }

exports.deleteExpense = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM expenses WHERE expense_id = $1";
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }