const ValorantAPI = require('./ValorantAPI');
const StatusHelper = require('./statusHelper')

module.exports.createJson = async function(settings, leagueToggle) {
	const lolSettingsEncoded = JSON.stringify(settings).toString()

	const settingsCopy = JSON.parse(JSON.stringify(settings));

	settingsCopy.partyClientVersion = await ValorantAPI.getClientVersion();
	settingsCopy.queueId = await StatusHelper.formatStatus(settings.queueId);
	return {
			state: "chat",
			msg: "get vulx at discord.gg/aquaplays",
			private: leagueToggle ? lolSettingsEncoded : Buffer.from(JSON.stringify(settingsCopy)).toString('base64'),
			shared: {
				actor: "",
				details: "",
				location: "",
				product: leagueToggle ? "league_of_legends" : "valorant",
				time: new Date().valueOf() + 10000000 //Extended timestamp to allow update bypass
			}
		}
}