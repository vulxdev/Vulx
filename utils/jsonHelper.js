/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

const ValorantAPI = require('./ValorantAPI');

module.exports.createJson = async function(settings, leagueToggle) {
	const lolSettingsEncoded = JSON.stringify(settings).toString()
	const config = Object.assign({}, settings);

	//await ValorantAPI.updatePlayerLoadout(config.accountLevel, config.playerCardId, config.playerTitleId)

	let status;
	if(config.partyId == "" || config.partyId == null) status = "offline"; 
	else if(config.isValid == false) status = "dnd";
	else if(config.sessionLoopState == "MENUS" && config.isIdle == true) status = "away";
	else status = "chat";

	config.partyClientVersion = await ValorantAPI.getClientVersion();
	return {
			state: status,
			private: leagueToggle ? lolSettingsEncoded : Buffer.from(JSON.stringify(config)).toString('base64'),
			shared: {
				actor: "",
				details: "",
				location: "",
				product: leagueToggle ? "league_of_legends" : "valorant",
				time: new Date().valueOf() + 35000 //Extended timestamp to allow update bypass
			}
		}
}