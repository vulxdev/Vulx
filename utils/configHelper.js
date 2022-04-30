const fs = require('fs');

module.exports.createConfig = function() {
    const configJson = {
        port: 80,
        discordRpc: false,
        experimental: false,
        gameMode: 'valorant',
        firstLaunch: false
    }

    fs.writeFileSync("./config.json", JSON.stringify(configJson));
}

module.exports.createValConfig = function() {
    // TODO: Add auto update on partyClientVersion
    const configJson = {
        isValid:true,
        sessionLoopState:'INGAME',
        partyOwnerSessionLoopState:'INGAME',
        customGameName:'',
        customGameTeam:'',
        partyOwnerMatchMap:'',
        partyOwnerMatchCurrentTeam:'',
        partyOwnerMatchScoreAllyTeam:0,
        partyOwnerMatchScoreEnemyTeam:0,
        partyOwnerProvisioningFlow:'Invalid',
        provisioningFlow:'Invalid',
        matchMap:'',
        partyId:'58DsGJ20-9prT-7Jy8-h7hS-YXF1YXBsYXlz',
        isPartyOwner:true,
        partyState:'DEFAULT',
        partyAccessibility:'CLOSED',
        maxPartySize:5,
        queueId:'Valorant Profile Editor',
        partyLFM:false,
        partyClientVersion:'release-04.08-shipping-15-701907',
        partySize:1,
        tournamentId:'',
        rosterId:'',
        partyVersion:1650719279092,
        queueEntryTime:'0001.01.01-00.00.00',
        playerCardId:'30b64514-440d-1261-f863-6bbb180263f9',
        playerTitleId:'00d4d326-4edc-3229-7c28-129d3374e3ad',
        preferredLevelBorderId:'',
        accountLevel:200,
        competitiveTier:2,
        leaderboardPosition:0,
        isIdle:true
    }

    fs.writeFileSync("./valorant.json", JSON.stringify(configJson));
}

module.exports.createLolConfig = function() {
    const configJson = {
        "championId":"25",
        "companionId":"15008",
        "damageSkinId":"1",
        "gameId":"5840315011",
        "gameMode":"CLASSIC",
        "gameQueueType":"NORMAL",
        "gameStatus":"inGame",
        "iconOverride":"",
        "isObservable":"ALL",
        "level":"167",
        "mapId":"11",
        "mapSkinId":"55",
        "masteryScore":"357",
        "profileIcon":"1",
        "puuid":"a8e43daa-f78c-516b-871c-565503dd9b5e",
        "queueId":"Hiii!!!",
        "rankedLeagueDivision":"III",
        "rankedLeagueQueue":"RANKED_SOL0_5x5",
        "rankedLeagueTier":"SILVER",
        "rankedLosses'":"O",
        "rankedPrevSeasonDivision":"IV",
        "rankedPrevSeasonTier":"SILVER",
        "rankedSplitRewardLever":"0",
        "rankedWins":"38",
        "skinVariant":"91000",
        "skinname":"Talon",
        "timeStamp":"1646014091142"
    }

    fs.writeFileSync("./league_of_legends.json", JSON.stringify(configJson));
}

module.exports.getConfig = function() {
    if (fs.existsSync("./config.json")) {
        return JSON.parse(fs.readFileSync("./config.json"));
    } else {
        this.createConfig();
        return this.getConfig();
    }
}

module.exports.getValConfig = function() {
    if (fs.existsSync("./valorant.json")) {
        return JSON.parse(fs.readFileSync("./valorant.json"));
    } else {
        this.createValConfig();
        return this.getValConfig();
    }
}

module.exports.getLolConfig = function() {
    if (fs.existsSync("./league_of_legends.json")) {
        return JSON.parse(fs.readFileSync("./league_of_legends.json"));
    } else {
        this.createLolConfig();
        return this.getLolConfig();
    }
}

module.exports.configNotExists = function() {
    return !fs.existsSync("./config.json") || !fs.existsSync("./valorant.json") || !fs.existsSync("./league_of_legends.json");
}