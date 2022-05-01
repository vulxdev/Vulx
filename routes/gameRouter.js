const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router
  .route('/getLoadouts')
  .get(gameController.getLoadouts);

module.exports = router;