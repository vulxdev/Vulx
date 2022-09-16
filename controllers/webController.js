/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');

const dashboard = catchAsync(async (req, res) => {
    await res.sendFile(path.join(__dirname, '../public/index.html'));
});

const setup = catchAsync(async (req, res) => {
    await res.sendFile(path.join(__dirname, '../public/welcome.html'));
});

const info = catchAsync(async (req, res) => {
    await res.sendFile(path.join(__dirname, '../public/info.html'));
});

const user = catchAsync(async (req, res) => {
    await res.sendFile(path.join(__dirname, `../public/user.html?puuid=${req.params.puuid}`));
});

module.exports = {
    dashboard,
	setup,
	info,
	user,
}