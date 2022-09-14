const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router
  .route('/getLoadouts')
  .get(gameController.getLoadouts);

router
  .route('/sendSystemMessage')
  .post(gameController.sendSystemMessage);

module.exports = router;