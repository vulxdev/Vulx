// library definitions
const httpStatus = require('http-status');
const axios = require('axios');

// helper definitions
const ValorantAPI = require('../utils/ValorantAPI');
const LookupAPI = require('../utils/LookupAPI');
const catchAsync = require('../utils/catchAsync');
const SystemMessageHelper = require('../utils/SystemMessageHelper');

const sendSystemMessage = catchAsync(async (req, res) => {
    await SystemMessageHelper.sendSystemMessage(req.body.message);
    res.status(httpStatus.OK).send("Message sent");
});

const getLoadouts = catchAsync(async (req, res) => {
    const weaponSkins = await LookupAPI.getWeaponSkins();
    const agents = await LookupAPI.getAgents();

    let playerArr = [];

    const matchLoadouts = await ValorantAPI.fetchMatchLoadouts();
    if (!matchLoadouts) 
        res.status(httpStatus.IM_A_TEAPOT).send();
    const matchInfo = await ValorantAPI.fetchMatch();

    const resolvedPlayers = await ValorantAPI.getPlayers(matchInfo.Players.map(player => player.Subject));
    const playerToName = resolvedPlayers.map(player => ({ [player.Subject]: player.GameName }));

    for(let i = 0; i < matchInfo.Players.length; i++) {
        const player = matchInfo.Players[i];
        let playerSkins = [];
        let weaponSkinIds = [];

        // i want to die. i love you, its okay, "hoof" job - aqua
        Object.values(matchLoadouts.Loadouts[i].Loadout.Items).forEach(item => Object.values(item.Sockets).forEach(socket => weaponSkinIds.push(socket.Item.ID)));

        weaponSkinIds.forEach(id => {
            const item = weaponSkins.filter(skin => skin.uuid == id)[0];
            if (item) playerSkins.push(item);
        })

        playerArr.push({
            id: player.Subject,
            name: playerToName.find(pl => pl[player.Subject])[player.Subject],
            teamID: player.TeamID,
            accountLevel: player.PlayerIdentity.AccountLevel,
            playerCard: await axios.get(`https://valorant-api.com/v1/playercards/${player.PlayerIdentity.PlayerCardID}`).then(res => res.data.data),
            playerTitle: await axios.get(`https://valorant-api.com/v1/playertitles/${player.PlayerIdentity.PlayerTitleID}`).then(res => res.data.data),
            character: agents.filter(agent => agent.uuid == player.CharacterID)[0],
            skins: playerSkins
        })
    }

    res.status(httpStatus.OK).send(playerArr);
})

module.exports = {
    getLoadouts,
    sendSystemMessage
}