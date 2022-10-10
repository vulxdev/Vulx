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
		"-1": 'norank',
        0: 'unranked',
        1: 'special',
        2: 'special',
        3: 'iron',
        4: 'iron',
        5: 'iron',
        6: 'bronze',
        7: 'bronze',
        8: 'bronze',
        9: 'silver',
        10: 'silver',
        11: 'silver',
        12: 'gold',
        13: 'gold',
        14: 'gold',
        15: 'platinum',
        16: 'platinum',
        17: 'platinum',
        18: 'diamond',
        19: 'diamond',
        20: 'diamond',
        21: 'ascendant',
        22: 'ascendant',
        23: 'ascendant',
        24: 'immortal',
        25: 'immortal',
        26: 'immortal',
        27: 'radiant'
      }
      return rankNames[rankId];
}

function resolveRankNumber(rankId) {
	return rankId < 3 ? 0 : (rankId - 2) % 3 == 0 ? 1 : (rankId - 2) % 3;
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
            const rank = document.getElementById("valorantRank")
			rank.innerHTML = '';

			const rankTitleSpan = document.createElement("span");
			rankTitleSpan.setAttribute("data-i18n", `ranks.${resolveRank(data.competitiveTier)}`);
			rank.appendChild(rankTitleSpan);

			if (data.competitiveTier > 0 && data.competitiveTier < 27) {
				const rankNumberSpan = document.createElement("span");
				rankNumberSpan.innerText = ` ${resolveRankNumber(data.competitiveTier)}`;
				rank.appendChild(rankNumberSpan);
			}

			if (data.leaderboardPosition) {
				const rankPositionSpan = document.createElement("span");
				rankPositionSpan.innerText = ` #${resolveIntComma(data.leaderboardPosition)}`;
				rank.appendChild(rankPositionSpan);
			}

            document.getElementById("valorantTitle").textContent = await getTitleText(data.playerTitleId);
                window.playerTitleId = data.playerTitleId;

			$('body').localize();

        }).catch(function(error) {
        console.log(error);
    });
} window.getProfile = getProfile;

getProfile();
