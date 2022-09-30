/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

async function getTitleText(title) {
    return fetch(`https://valorant-api.com/v1/playertitles/${title}`)
        .then(res => res.json())
        .then(res => res.data.titleText);
}

function resolveIntComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function resolveRank(rankId) {
    const rankNames = {
		"-1": 'Empty',
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

function getProfile() {
    fetch("http://127.0.0.1:/currentSettings").then(function(response) {
        return response.json();
        }).then(async function(data) {
            //grabs & sets the profile variables
            document.getElementById("valorantMatchStatus").textContent = data.queueId;
            document.getElementById("valorantStatus").value = data.queueId;
            document.getElementById("valorantLeaderboard").value = data.leaderboardPosition; 
            document.getElementById("valorantLevel").value = data.accountLevel;
            document.getElementById("ally").textContent = data.partyOwnerMatchScoreAllyTeam;
            document.getElementById("valorantAlly").value = data.partyOwnerMatchScoreAllyTeam;
            document.getElementById("enemy").textContent = data.partyOwnerMatchScoreEnemyTeam;
            document.getElementById("valorantEnemy").value = data.partyOwnerMatchScoreEnemyTeam;
            document.getElementById("activity").src = `https://cdn.aquaplays.xyz/user/${data.status}.png`;     
            document.getElementById("playerCard").src = `https://media.valorant-api.com/playercards/${data.playerCardId}/wideart.png`;
            document.getElementById("playerCardSmall").src = `https://media.valorant-api.com/playercards/${data.playerCardId}/smallart.png`;
            document.getElementById("valorantRankImg").src = `https://cdn.aquaplays.xyz/ranks/${data.competitiveTier < 3 ? 0 : data.competitiveTier}.png`;
            document.getElementById("valorantRank").textContent = `${resolveRank(data.competitiveTier)}${data.leaderboardPosition != 0 ? ` #${resolveIntComma(data.leaderboardPosition)}` : ''}`;
            document.getElementById("valorantTitle").textContent = await getTitleText(data.playerTitleId);
                window.playerTitleId = data.playerTitleId;

        }).catch(function(error) {
        console.log(error);
    });
} window.getProfile = getProfile;

getProfile();
