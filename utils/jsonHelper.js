const configHelper = require('./configHelper');
const ValorantAPI = require('./ValorantAPI');

module.exports.createJson = async function(settings, leagueToggle) {
	const lolConfig = configHelper.getLolConfig();
	const lolSettingsEncoded = JSON.stringify(lolConfig).toString()

	settings.partyClientVersion = ValorantAPI.clientVersion;
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