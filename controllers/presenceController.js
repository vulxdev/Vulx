// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');
const discord = require("../utils/discordHelper");
const meHelper = require('../utils/meHelper');

const updatePresence = catchAsync(async (req, res) => {
    const valConfig = await meHelper.getValorantJson();

	valConfig.queueId = req.body.status;
	valConfig.competitiveTier = req.body.rank;
	valConfig.leaderboardPosition = req.body.position;
	valConfig.accountLevel = req.body.level;
	valConfig.partyOwnerMatchScoreAllyTeam = req.body.ally;
	valConfig.partyOwnerMatchScoreEnemyTeam = req.body.enemy;

	await discord.update();
	
	await meHelper.updateRequest(valConfig);
        
    await res.sendFile(path.join(__dirname, '../public/index.html'));
});

const currentSettings = catchAsync(async (req, res) => {
    const valConfig = await meHelper.getValorantJson();
	const data = {
		queueId: valConfig.queueId,
		competitiveTier: valConfig.competitiveTier,
		leaderboardPosition: valConfig.leaderboardPosition,
		accountLevel: valConfig.accountLevel,
		partyOwnerMatchScoreAllyTeam: valConfig.partyOwnerMatchScoreAllyTeam,
		partyOwnerMatchScoreEnemyTeam: valConfig.partyOwnerMatchScoreEnemyTeam,
		playerCardId: valConfig.playerCardId,
		playerTitleId: valConfig.playerTitleId
	}

	logger.debug(`Sending current settings to client, ${JSON.stringify(data)}`);

	res.status(httpStatus.OK).send(data);
});

module.exports = {
    updatePresence,
    currentSettings
}