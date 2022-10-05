/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const AxiosHelper = require('../utils/AxiosHelper');
const Lockfile = require('../utils/lockfile');
const ConfigHelper = require('../utils/configHelper');
const FriendHelper = require('../utils/FriendHelper');
const meHelper = require('../utils/meHelper');
const Logger = require('../utils/Logger');
const ValorantAPI = require('../utils/ValorantAPI');

const updateStatus = catchAsync(async (req, res) => {
    const valConfig = await ConfigHelper.getValorantConfig();

	valConfig.sessionLoopState = "INGAME";
	valConfig.partyId = "727";
	valConfig.isValid = true;
	valConfig.isIdle = false;

	switch (req.body.status) {
		case "offline":
			valConfig.sessionLoopState = "MENUS";
			valConfig.partyId = undefined;
			break;
		case "stream":
			valConfig.sessionLoopState = "WYSI";
			break;
		case "dnd":
			valConfig.isValid = false;
			valConfig.sessionLoopState = "MENUS";
			break;
		case "away": 
			valConfig.isIdle = true;
			valConfig.sessionLoopState = "MENUS";
		case "available":
			valConfig.sessionLoopState = "MENUS";
		default:
			break;
	}

	Logger.debug(`Status updated :: ${JSON.stringify(valConfig)}`);

	await meHelper.updateRequest(valConfig);
    await res.status(httpStatus.OK).send();
});

const getRequestsCount = catchAsync(async (req, res) => {
    const response = await (await AxiosHelper.getVulxAxios()).get("/chat/v3/friendrequests");
	const returnJson = {
        count: response.data.requests.length,
    };
	
    Logger.debug(`Friend requests count :: ${JSON.stringify(returnJson)}`);
    res.status(httpStatus.OK).send(returnJson);
});

const timePlaying = catchAsync(async (req, res) => {
    const response = await (await AxiosHelper.getVulxAxios()).get("/telemetry/v1/application-start-time");
    const returnJson = {
        time: response.data,
    };
    Logger.debug(`Game Telemetry :: ${JSON.stringify(returnJson)}`);

    res.status(httpStatus.OK).send(returnJson);
});

const userSession = catchAsync(async (req, res) => {
    const config = await ConfigHelper.getVulxConfig();

    const userInfo = await ValorantAPI.getUserInfo();
    const returnJson = {
        session: userInfo,
		config: config,
		port: Lockfile.port,
		password: Buffer.from(`riot:${Lockfile.password}`).toString('base64')
    };
    Logger.debug(`Session info :: ${JSON.stringify(returnJson)}`);

    res.status(httpStatus.OK).send(returnJson);
});

const updateSettings = catchAsync(async (req, res) => {
    const config = await ConfigHelper.getVulxConfig();

	Logger.debug(`Updated settings:
        Experimental Features: ${config.experimental} --> ${req.body.experimentalFeatures}
        Discord RPC: ${config.discordRpc} --> ${req.body.discordRpc}
        First Launch: ${config.firstLaunch} --> ${req.body.firstLaunch}
		Web ToolTips: ${config.webTooltips} --> ${req.body.webTooltips}`);

	switch (req.body.updateType) {
		case "settingsIndex":
			config.experimental = req.body.experimentalFeatures === "true" ? true : false;
			config.discordRpc = req.body.discordRpc === "true" ? true : false;
			config.webTooltips = req.body.webTooltips === "true" ? true : false;
			break;
		case "settingsWelcome":
			config.firstLaunch = req.body.firstLaunch;
			config.discordRpc = req.body.data.discordRpc === "true" ? true : false;
			config.experimental = req.body.data.testFeatures === "true" ? true : false;
			break;
	}

	Logger.debug(`Updated Vulx settings :: ${JSON.stringify(config)}`);

	ConfigHelper.vulxConfig = config;
	await ConfigHelper.saveConfig();

	res.redirect("/dashboard");
});

const resetAccount = catchAsync(async (req, res) => {
    if(req.body.resetAccount == true) {
        await ConfigHelper.resetConfig();
		Logger.debug("Resetting account");
        res.status(httpStatus.OK).send();
    }
    res.status(httpStatus.IM_A_TEAPOT).send();
});

const getFriends = catchAsync(async (req, res) => {
	const friends = await FriendHelper.getFriends();
	const presences = await FriendHelper.getPresences();
    
	const data = {
		friends: friends,
		onlineFriends: presences
	}

	Logger.debug(`Fufilled friends request :: ${JSON.stringify(data)}`);
	res.status(httpStatus.OK).send(data);
});

module.exports = {
    userSession,
	timePlaying,
	getRequestsCount,
    updateSettings,
	updateStatus,
    resetAccount,
    getFriends
};