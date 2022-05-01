const express = require('express');
const profileRouter = require('./profileRouter');
const gameRouter = require('./gameRouter');

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
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;