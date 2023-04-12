const express = require("express");

//import controller
const budgetController = require("./../controllers/budgetControllers");

const router = express.Router();

router.route("/").post(budgetController.makeBudget);

router
  .route("/:id")
  .get(budgetController.getBudget)
  .patch(budgetController.patchBudget)
  .put(budgetController.putBudget)
  .delete(budgetController.deleteBudget);

module.exports = router;
