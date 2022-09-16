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

	config.partyClientVersion = await ValorantAPI.getClientVersion();
	return {
			state: config.isIdle ? "away" : "chat",
			msg: "get vulx at discord.gg/aquaplays",
			private: leagueToggle ? lolSettingsEncoded : Buffer.from(JSON.stringify(config)).toString('base64'),
			shared: {
				actor: "",
				details: "",
				location: "",
				product: leagueToggle ? "league_of_legends" : "valorant",
				time: new Date().valueOf() + 10000000 //Extended timestamp to allow update bypass
			}
		}
}