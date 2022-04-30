const express = require('express');
const profileController = require('../controllers/profileController');
const presenceController = require('../controllers/presenceController');

const router = express.Router();

router
  .route('/userSession')
  .get(profileController.userSession);

router
  .route('/updateSettings')
  .post(profileController.updateSettings);

router
  .route('/resetAccount')
  .post(profileController.resetAccount);

router
  .route('/updatePresence')
  .post(presenceController.updatePresence);

router
  .route('/currentSettings')
  .get(presenceController.currentSettings);

module.exports = router;