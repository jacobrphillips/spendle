const express = require("express");

//import controller
const expenseController = require("./../controllers/expenseControllers");

const router = express.Router();

router.route("/").post(expenseController.makeExpense);

router
  .route("/:id")
  .get(expenseController.getExpense)
  .patch(expenseController.patchExpense)
  .put(expenseController.putExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
