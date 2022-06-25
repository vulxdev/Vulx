const RPC = require("discord-rpc")
const logger = require('./logger')
const configHelper = require('./configHelper');
const meHelper = require("./meHelper");

const clientId = "948363491100721242";
let client = new RPC.Client({ transport: 'ipc' });

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
    15: "Platium 1",
    16: "Platium 2",
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

client.on('ready', () => {
    const config = configHelper.getConfig();
    logger.discord(`Authed as ${client.user.username}#${client.user.discriminator}`);

    if (config.discordRpc)
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity : {
                details : "Valorant Profile Editor",
                assets : {
                    large_image : "logo",
                    large_text : "Vulx",
                },
                buttons : [{label : "Discord" , url : "https://discord.com/aquaplays"},{label : "Website" , url : "https://aquaplays.xyz"}]
            }
        })
})

module.exports.update = function() {
    const config = configHelper.getConfig();
    try {
		meHelper.getValorantJson()
			.then(valorantConfig => {
				if(config.discordRpc) {
					client.request('SET_ACTIVITY', {
						pid: process.pid,
						activity : {
							details : "Valorant Profile Editor",
							state : `${valorantConfig.queueId.length < 128 ? valorantConfig.queueId : 'Playing Valorant'}`,
							assets : {
								large_image : "logo",
								large_text : "Vulx",
								small_image: `${valorantConfig.competitiveTier}`,
								small_text: `${rankIdToName[valorantConfig.competitiveTier]}${valorantConfig.leaderboardPosition != 0 ? ` #${valorantConfig.leaderboardPosition}` : ''}`,
							},
							buttons : [{label : "Discord" , url : "https://discord.com/aquaplays"},{label : "Website" , url : "https://aquaplays.xyz"}]
						}
					})
					logger.debug("Discord RPC status has been updated")
				} else {
					client.clearActivity();
				}
			})
    } catch (err) {
        logger.discord("Failed to update RPC Client status");
		console.log(err)
    }
}

module.exports.startRPC = async function() {
    client = new RPC.Client({ transport: 'ipc' })

    client.on('disconnected', async () => {
        await client.destroy();
    })

    try {
        await client.login({ clientId });
    } catch (err) {
        logger.discord("Failed to start RPC Client");
        try {
            await client.destroy();
        } catch (err) {
            logger.error("Failed to find Discord")
        }
    }
}