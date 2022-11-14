const ConfigHelper = require("./configHelper");
const meHelper = require("./meHelper");
const MeHelper = require("./meHelper");

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