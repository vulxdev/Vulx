const express = require('express');

const router = express.Router();

router
  .route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

module.exports = router;