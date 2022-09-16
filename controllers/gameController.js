/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const httpStatus = require('http-status');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const SystemMessageHelper = require('../utils/SystemMessageHelper');

const sendSystemMessage = catchAsync(async (req, res) => {
    await SystemMessageHelper.sendSystemMessage(req.body.message);
    res.status(httpStatus.OK).send("Message sent");
});

module.exports = {
    sendSystemMessage
}