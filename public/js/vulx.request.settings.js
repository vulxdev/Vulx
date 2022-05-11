fetch("http://127.0.0.1:/currentSettings").then(function(response) {
    return response.json();
    }).then(function(data) {
        var status = document.getElementById("status");
            status.value = data.queueId;
        var rank = document.getElementById("rank");
            rank.value = data.competitiveTier;
        var position = document.getElementById("position");
            position.value = data.leaderboardPosition;
        var level = document.getElementById("level");
            level.value = data.accountLevel;
        var ally = document.getElementById("ally");
            ally.value = data.partyOwnerMatchScoreAllyTeam;
        var enemy = document.getElementById("enemy");
            enemy.value = data.partyOwnerMatchScoreEnemyTeam;
    }).catch(function() {
    console.log("Error.");
});