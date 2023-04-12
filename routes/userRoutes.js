const express = require('express');

//import controller
const userController = require('./../controllers/userControllers');

const router = express.Router();

router.route("/").post(userController.makeUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.patchUser)
  .put(userController.putUser)
  .delete(userController.deleteUser);

  module.exports = router;