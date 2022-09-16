/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router
  .route('/sendSystemMessage')
  .post(gameController.sendSystemMessage);

module.exports = router;