const RPC = require("discord-rpc")
const Logger = require('./Logger')
const ConfigHelper = require('./ConfigHelper');
const meHelper = require("./meHelper");

const rankIdToName = {
    0: "Unranked",
    1: "Unused 1",
    2: "Unused 2",
    3: "Iron 1",
    4: "Iron 2",
    5: "Iron 3",
    6: "Bronze 1",
    7: "Bronze 2",
    8: "Bronze 3",
    9: "Silver 1",
    10: "Silver 2",
    11: "Silver 3",
    12: "Gold 1",
    13: "Gold 2",
    14: "Gold 3",
    15: "Platinum 1",
    16: "Platinum 2",
    17: "Platinum 3",
    18: "Diamond 1",
    19: "Diamond 2",
    20: "Diamond 3",
	21: "Ascendant 1",
	22: "Ascendant 2",
	23: "Ascendant 3",
    24: "Immortal 1",
    25: "Immortal 2",
    26: "Immortal 3",
    27: "Radiant",
}
exports.rankIdToName = rankIdToName;

const clientId = "948363491100721242";
const client = new RPC.Client({ transport: 'ipc' });

module.exports.refreshActivity = function() {
	try {
		if (!client) return;
		ConfigHelper.getVulxConfig().then(config => {
			ConfigHelper.getValorantConfig().then(valorantConfig => {
				if(config.discordRpc) {
					const activity = {
						details : "Valorant Profile Editor",
						state : `${valorantConfig.queueId.length < 128 ? valorantConfig.queueId : 'Playing Valorant' || 'Playing Valorant'}`,
						assets : {
							large_image : "logo",
							large_text : "Vulx",
							small_image: `${valorantConfig.competitiveTier || 'logo2'}`,
							small_text: `${rankIdToName[valorantConfig.competitiveTier]}${valorantConfig.leaderboardPosition != 0 ? ` #${valorantConfig.leaderboardPosition}` : '' || 'Cannot get rank.'}`,
						},
						buttons : [{label : "Discord" , url : "https://discord.com/aquaplays"},{label : "Website" , url : "https://aquaplays.xyz"}]
					}
					client.request('SET_ACTIVITY', {
						pid: process.pid,
						activity,
					})
					Logger.debug(`Updated Discord RPC :: ${JSON.stringify(activity)}`);
				}
				else {
					client.clearActivity();
				}
			})
		})
    } catch (err) {
        Logger.debug(`Failed refresh Discord RPC activity :: ${err}`);
    }
}

module.exports.init = function() {
	client.login({ clientId })
		.then(() => {
			Logger.debug(`Initialised Discord RPC | Client ID: ${clientId}`);
			this.refreshActivity();
		})
		.catch(err => {
			Logger.debug(`Failed to initialise Discord RPC :: ${err}`);
		});
}