const configHelper = require('./configHelper');
const axios = require('axios');

module.exports.createJson = async function(settings, leagueToggle) {
	const lolConfig = configHelper.getLolConfig();
	const lolSettingsEncoded = JSON.stringify(lolConfig).toString()

	// fetch party version from external api, talk to officer if he minds about us doing this
	const response = await axios.get('https://valorant-api.com/v1/version');
	settings.partyClientVersion = response.data.data.riotClientVersion;
	return {
			state: "chat",
			msg: "get vulx at discord.gg/aquaplays",
			private: leagueToggle ? lolSettingsEncoded : Buffer.from(JSON.stringify(settings)).toString('base64'),
			shared: {
				actor: "",
				details: "",
				location: "",
				product: leagueToggle ? "league_of_legends" : "valorant",
				time: new Date().valueOf() + 10000000 //Extended timestamp to allow update bypass
			}
		}
}