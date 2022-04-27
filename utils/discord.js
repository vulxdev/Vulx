const RPC = require("discord-rpc")
const logger = require('./logger')
const configHelper = require('./configHelper')

const clientId = "948363491100721242";
const client = new RPC.Client({ transport: 'ipc' });

client.on('ready', () => {
    const config = configHelper.getConfig();
    logger.discord(`Authed as ${client.user.username}#${client.user.discriminator}`);

    if (config.discordRpc)
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity : {
                details : "Using Vulx",
                state: "Launching",
                assets : {
                    large_image : "logo",
                    large_text : "ValorantRC"
                },
                buttons : [{label : "Discord" , url : "https://discord.com/aquaplays"},{label : "Website" , url : "https://aquaplays.xyz"}]
            }
        })
})

module.exports.update = function(status) {
    const config = configHelper.getConfig();
    //add rank support
    //add small image rank status [ small_image: " ]
    if(config.discordRpc) {
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity : {
                details : "Using Vulx",
                state : status,
                assets : {
                    large_image : "logo",
                    large_text : "ValorantRC"
                },
                buttons : [{label : "Discord" , url : "https://discord.com/aquaplays"},{label : "Website" , url : "https://aquaplays.xyz"}]
            }
        })
        logger.debug("RPC Client status updated.")
    } else {
        client.clearActivity();
    }
}

module.exports.startRPC = function() {
    client.login({ clientId });
}