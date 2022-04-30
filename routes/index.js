const express = require('express');
const profileRouter = require('./profileRouter');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: profileRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;