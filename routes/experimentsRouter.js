const express = require('express');
const experimentsController = require('../controllers/experimentsController');

const router = express.Router();

router
  .route('/updateExperiments')
  .post(experimentsController.updateExperiments);

router
  .route('/currentExperiments')
  .get(experimentsController.currentExperiments);

module.exports = router;