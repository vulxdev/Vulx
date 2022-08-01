async function getTitleText(title) {
    if (!title) return 'Friend';

    return fetch(`https://valorant-api.com/v1/playertitles/${title}`)
        .then(res => res.json())
        .then(res => res.data.titleText);
}

function resolveRank(rankId) {
    const rankNames = {
        0: 'Unranked',
        1: 'Unused 1',
        2: 'Unused 2',
        3: 'Iron 1',
        4: 'Iron 2',
        5: 'Iron 3',
        6: 'Bronze 1',
        7: 'Bronze 2',
        8: 'Bronze 3',
        9: 'Silver 1',
        10: 'Silver 2',
        11: 'Silver 3',
        12: 'Gold 1',
        13: 'Gold 2',
        14: 'Gold 3',
        15: 'Platinum 1',
        16: 'Platinum 2',
        17: 'Platinum 3',
        18: 'Diamond 1',
        19: 'Diamond 2',
        20: 'Diamond 3',
        21: 'Ascendant 1',
        22: 'Ascendant 2',
        23: 'Ascendant 3',
        24: 'Immortal 1',
        25: 'Immortal 2',
        26: 'Immortal 3',
        27: 'Radiant'
      }
      return rankNames[rankId];
}

fetch("http://127.0.0.1:/currentSettings").then(function(response) {
    return response.json();
    }).then(async function(data) {
        var status = document.getElementById("valorantMatchStatus");
            status.textContent = data.queueId;
        var playerCardId = document.getElementById("playerCard").src = `https://media.valorant-api.com/playercards/${data.playerCardId}/wideart.png`;
        var playerCardSmallId = document.getElementById("playerCardSmall").src = `https://media.valorant-api.com/playercards/${data.playerCardId}/smallart.png`;
        var playerTitleId = document.getElementById("valorantTitle");
            playerTitleId.textContent = await getTitleText(data.playerTitleId);
        var rankImg = document.getElementById("valorantRankImg")
            if(data.competitiveTier <= 2 || data.competitiveTier >= 28) { 
                rankImg.src = "https://cdn.aquaplays.xyz/ranks/0.png";
            } else {
                rankImg.src = `https://cdn.aquaplays.xyz/ranks/${data.competitiveTier}.png`;
            }
		var rankPositionSpan = document.createElement("span");
			rankPositionSpan.textContent = ` #${data.leaderboardPosition}`;
			rankPositionSpan.style.fontSize = "14px";
        var rank = document.getElementById("valorantRank");
			rank.textContent = data.competitiveTier <= 0 || data.competitiveTier >= 28 ? resolveRank(0) : resolveRank(data.competitiveTier);
			if (data.leaderboardPosition != 0) rank.appendChild(rankPositionSpan);

        var position = document.getElementById("position");
            position.value = data.leaderboardPosition;
        var level = document.getElementById("level");
            level.value = data.accountLevel;
        var ally = document.getElementById("ally");
            ally.value = data.partyOwnerMatchScoreAllyTeam;
        var enemy = document.getElementById("enemy");
            enemy.value = data.partyOwnerMatchScoreEnemyTeam;
    }).catch(function(error) {
    console.log(error);
});