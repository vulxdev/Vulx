// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const { vulxAxios, lockFile } = require('../utils/axiosHelper');
const configHelper = require('../utils/configHelper');
const logger = require('../utils/logger');
const discord = require("../utils/discordHelper");
const { createJson } = require('../utils/jsonHelper');

const userSession = catchAsync(async (req, res) => {
    const config = configHelper.getConfig();

    const response = await vulxAxios.get("/chat/v1/session");
    const returnJson = {
        session: response.data,
		config: config,
		port: lockFile.port,
		password: Buffer.from(`riot:${lockFile.password}`).toString('base64')
    };
    logger.debug(`Session info, ${JSON.stringify(returnJson)}`);

    res.status(httpStatus.OK).send(returnJson);
});

const updateSettings = catchAsync(async (req, res) => {
    const valConfig = configHelper.getConfig();

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

	fs.writeFileSync("./config.json", JSON.stringify(valConfig));

	res.sendFile(path.join(__dirname, '../public/index.html'));
});

const resetAccount = catchAsync(async (req, res) => {
    if(req.body.resetAccount == true) {
        logger.debug("Account reset")
        fs.unlinkSync("./valorant.json");
        fs.unlinkSync("./config.json");
        fs.unlinkSync("./league_of_legends.json");
        res.status(httpStatus.OK).send();
    }
    res.status(httpStatus.IM_A_TEAPOT).send();
});

module.exports = {
    userSession,
    updateSettings,
    resetAccount
};