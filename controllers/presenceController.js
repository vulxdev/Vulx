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

const updatePresence = catchAsync(async (req, res) => {
    const valConfig = configHelper.getValConfig();

	valConfig.queueId = req.body.status;
	valConfig.competitiveTier = req.body.rank;
	valConfig.leaderboardPosition = req.body.position;
	valConfig.accountLevel = req.body.level;
	valConfig.partyOwnerMatchScoreAllyTeam = req.body.ally;
	valConfig.partyOwnerMatchScoreEnemyTeam = req.body.enemy;

	fs.writeFileSync("../valorant.json", JSON.stringify(valConfig));
	discord.update(valConfig.queueId, valConfig.competitiveTier) //Spacing is important
	let json = await createJson(valConfig, false)

	await vulxAxios.put("/chat/v2/me", json)
		.then((res) => {
			if (!res.isAxiosError) {
				logger.debug("Updated account")
			}
		})
        
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const currentSettings = catchAsync(async (req, res) => {
    const valConfig = configHelper.getValConfig();
	const data = {
		queueId: valConfig.queueId,
		competitiveTier: valConfig.competitiveTier,
		leaderboardPosition: valConfig.leaderboardPosition,
		accountLevel: valConfig.accountLevel,
		partyOwnerMatchScoreAllyTeam: valConfig.partyOwnerMatchScoreAllyTeam,
		partyOwnerMatchScoreEnemyTeam: valConfig.partyOwnerMatchScoreEnemyTeam
	}

	logger.debug(data)

	res.status(httpStatus.OK).send(data);
});

module.exports = {
    updatePresence,
    currentSettings
}