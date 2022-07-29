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
const logger = require('../utils/logger');

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
    updateSettings,
    resetAccount,
    getFriends
};