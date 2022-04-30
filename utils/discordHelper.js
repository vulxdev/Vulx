const RPC = require("discord-rpc")
const logger = require('./logger')
const configHelper = require('./configHelper')

const clientId = "948363491100721242";
let client = new RPC.Client({ transport: 'ipc' });

const rankIdToName = {
    0: "Unranked",
    1: "Unused I",
    2: "Unused II",
    3: "Iron I",
    4: "Iron II",
    5: "Iron III",
    6: "Bronze I",
    7: "Bronze II",
    8: "Bronze III",
    9: "Silver I",
    10: "Silver II",
    11: "Silver III",
    12: "Gold I",
    13: "Gold II",
    14: "Gold III",
    15: "Platium I",
    16: "Platium II",
    17: "Platinum III",
    18: "Diamond I",
    19: "Diamond II",
    20: "Diamond III",
    21: "Immortal I",
    22: "Immortal II",
    23: "Immortal III",
    24: "Radiant",
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

module.exports.update = function(status, competitiveTier) {
    const config = configHelper.getConfig();
    try {
        if(config.discordRpc) {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity : {
                    details : "Valorant Profile Editor",
                    state : `${status.length < 128 ? status : 'Playing Valorant'}`,
                    assets : {
                        large_image : "logo",
                        large_text : "Vulx",
                        small_image: `${competitiveTier}`,
                        small_text: `${rankIdToName[competitiveTier]}`
                    },
                    buttons : [{label : "Discord" , url : "https://discord.com/aquaplays"},{label : "Website" , url : "https://aquaplays.xyz"}]
                }
            })
            logger.debug("RPC Client status updated.")
        } else {
            client.clearActivity();
        }
    } catch (err) {
        logger.discord("Failed to update RPC Client status");
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
        await client.destroy();
    }
}