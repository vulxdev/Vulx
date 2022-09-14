// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const AxiosHelper = require('../utils/axiosHelper');
const Lockfile = require('../utils/lockfile');
const configHelper = require('../utils/configHelper');
const FriendHelper = require('../utils/FriendHelper');
const meHelper = require('../utils/meHelper');
const logger = require('../utils/logger');

const updateStatus = catchAsync(async (req, res) => {
    const valConfig = await meHelper.getValorantJson();

	switch (req.body.status) {
		case "online":
			valConfig.sessionLoopState = "INGAME";
			valConfig.partyId = "727";
			valConfig.isValid = true;
			valConfig.isIdle = false;
			break;
		case "offline":
			valConfig.sessionLoopState = "INGAME";
			valConfig.partyId = "";
			valConfig.isValid = true;
			valConfig.isIdle = false;
			break;
		case "stream":
			valConfig.sessionLoopState = "wysi";
			valConfig.isValid = true;
			valConfig.partyId = "727";
			valConfig.isIdle = false;
			break;
		case "dnd":
			valConfig.sessionLoopState = "INGAME";
			valConfig.isValid = false;
			valConfig.partyId = "727";
			valConfig.isIdle = false;
			break;
		case "away": 
			valConfig.sessionLoopState = "MENUS";
			valConfig.isValid = true;
			valConfig.partyId = "727";
			valConfig.isIdle = true;
		default:
			break;
	}

	await meHelper.updateRequest(valConfig);
    await res.status(httpStatus.OK).send();
});

const getRequestsCount = catchAsync(async (req, res) => {
    const response = await (await AxiosHelper.getVulxAxios()).get("/chat/v3/friendrequests");
	const returnJson = {
        count: response.data.requests.length,
    };
	
    logger.debug(`Friend requests count, ${JSON.stringify(returnJson)}`);
    res.status(httpStatus.OK).send(returnJson);
});

const timePlaying = catchAsync(async (req, res) => {
    const response = await (await AxiosHelper.getVulxAxios()).get("/telemetry/v1/application-start-time");
    const returnJson = {
        time: response.data,
    };
    logger.debug(`Game Telemetry, ${JSON.stringify(returnJson)}`);

    res.status(httpStatus.OK).send(returnJson);
});

const userSession = catchAsync(async (req, res) => {
    const config = await configHelper.getVulxConfig();

    const response = await (await AxiosHelper.getVulxAxios()).get("/chat/v1/session");
    const returnJson = {
        session: response.data,
		config: config,
		port: Lockfile.port,
		password: Buffer.from(`riot:${Lockfile.password}`).toString('base64')
    };
    logger.debug(`Session info, ${JSON.stringify(returnJson)}`);

    res.status(httpStatus.OK).send(returnJson);
});

const updateSettings = catchAsync(async (req, res) => {
    const valConfig = await configHelper.getVulxConfig();

	logger.debug(`Updated settings:
        Experimental Features: ${valConfig.experimental} --> ${req.body.experimentalFeatures}
        Discord RPC: ${valConfig.discordRpc} --> ${req.body.discordRpc}
        First Launch: ${valConfig.firstLaunch} --> ${req.body.firstLaunch}`);

	switch (req.body.updateType) {
		case "settingsIndex":
			valConfig.experimental = req.body.experimentalFeatures === "true" ? true : false;
			valConfig.discordRpc = req.body.discordRpc === "true" ? true : false;
			break;
		case "settingsWelcome":
			valConfig.firstLaunch = req.body.firstLaunch;
			valConfig.discordRpc = req.body.data.discordRpc === "true" ? true : false;
			valConfig.experimental = req.body.data.testFeatures === "true" ? true : false;
			break;
		default:
			break;
	}

	fs.writeFileSync("./cfg/vulx.json", JSON.stringify(valConfig));

	res.sendFile(path.join(__dirname, '../public/index.html'));
});

const resetAccount = catchAsync(async (req, res) => {
	logger.debug("Resetting account");
    if(req.body.resetAccount == true) {
        logger.debug("Account reset")
        fs.unlinkSync("./cfg/valorant.json");
        fs.unlinkSync("./cfg/vulx.json");
        fs.unlinkSync("./cfg/league.json");
		fs.unlinkSync("./cfg/experiments.json");
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

	logger.debug(`Sending current friends to client`);
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