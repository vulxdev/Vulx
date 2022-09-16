/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const express = require('express');
const webController = require('../controllers/webController');

const router = express.Router();

router
  .route('/dashboard')
  .get(webController.dashboard);

router
  .route('/setup')
  .get(webController.setup);

router
  .route('/')
  .get(webController.info);

router
  .route('/user/:puuid')
  .get(webController.user);

module.exports = router;