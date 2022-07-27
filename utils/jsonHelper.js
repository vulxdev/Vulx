const ValorantAPI = require('./ValorantAPI');
const StatusHelper = require('./statusHelper');
const LicenseHelper = require('./LicenseHelper');

module.exports.createJson = async function(settings, leagueToggle) {
	const lolSettingsEncoded = JSON.stringify(settings).toString()
	const config = Object.assign({}, settings);

	config.partyClientVersion = await ValorantAPI.getClientVersion();
	if (!LicenseHelper.isDev) config.queueId = await StatusHelper.formatStatus(settings.queueId);
	//config.queueId = '\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
	return {
			state: "chat",
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