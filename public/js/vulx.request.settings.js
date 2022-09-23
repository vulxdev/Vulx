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
            document.getElementById("playerCard").src = `https://media.valorant-api.com/playercards/${data.playerCardId}/wideart.png`;
            document.getElementById("playerCardSmall").src = `https://media.valorant-api.com/playercards/${data.playerCardId}/smallart.png`;
            document.getElementById("valorantTitle").textContent = await getTitleText(data.playerTitleId);
                window.playerTitleId = data.playerTitleId;

            //grabs & sets the rank image
            var rankImg = document.getElementById("valorantRankImg")
                if(data.competitiveTier == 0 || data.competitiveTier == 1 || data.competitiveTier == 2) { 
                    rankImg.src = "https://cdn.aquaplays.xyz/ranks/0.png";
                } else {
                    rankImg.src = `https://cdn.aquaplays.xyz/ranks/${data.competitiveTier}.png`;
                }

            //grabs & sets the rank name & leaderboard position
            var rank = document.getElementById("valorantRank");
                if(data.leaderboardPosition != 0) {
                    rank.textContent = resolveRank(data.competitiveTier) + ' #' + resolveIntComma(data.leaderboardPosition);;
                } else {
                    rank.textContent = resolveRank(data.competitiveTier);
                }
                   
            //grabs & sets the activity / status
            var status = document.getElementById("activity"); 
                if(data.status == "dnd") {
                    status.src = "https://cdn.discordapp.com/attachments/808062997180317767/1019725640326467664/dnd.png";
                } else {
                    status.src = `https://cdn.aquaplays.xyz/user/${data.status}.png`;
                }        
        }).catch(function(error) {
        console.log(error);
    });
} window.getProfile = getProfile;

getProfile();
