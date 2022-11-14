/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const ConfigHelper = require("./configHelper");
const meHelper = require("./meHelper");

const updateStatusMessage = async (message) => {
    const valConfig = await ConfigHelper.getValorantConfig();
    valConfig.sessionLoopState = "INGAME";
	valConfig.partyId = "727";
	valConfig.isValid = true;
	valConfig.isIdle = false;
    valConfig.queueId = message;
    meHelper.updateRequest(valConfig);
};

const updateScore = async (ally, enemy) => {
    const valConfig = await ConfigHelper.getValorantConfig();
    valConfig.sessionLoopState = "INGAME";
	valConfig.partyId = "727";
	valConfig.isValid = true;
	valConfig.isIdle = false;
    valConfig.partyOwnerMatchScoreAllyTeam = ally;
    valConfig.partyOwnerMatchScoreEnemyTeam = enemy;
    meHelper.updateRequest(valConfig);
};

module.exports = { updateStatusMessage, updateScore };