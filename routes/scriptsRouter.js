/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const express = require('express');
const scriptController = require('../controllers/scriptController');

const router = express.Router();

router
  .route('/updateScript')
  .post(scriptController.updateScript);

router
  .route('/getScriptJson')
  .get(scriptController.getScriptJson);
  
module.exports = router;