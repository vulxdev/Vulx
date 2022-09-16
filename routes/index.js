/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const express = require('express');
const profileRouter = require('./profileRouter');
const gameRouter = require('./gameRouter');
const webRouter = require('./webRouter');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: profileRouter,
    },
    {
        path: '/',
        route: gameRouter,
    },
	{
        path: '/',
        route: webRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;