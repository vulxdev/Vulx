/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

fetch("http://127.0.0.1:/userSession").then(function(response) {
    return response.json();
    }).then(function(data) {
        if(data.config.firstLaunch == false) {
            window.location.href = "welcome.html";
        }
        if(data.config.experimental == true) {
            document.getElementById("experimentalNav").style.display = "flex";
            document.getElementById("gameFeedNav").style.display = "flex";
        } else {
            if(!window.location.href.includes("index.html")) {
                window.location.href = "index.html";
            }
        }
        //grabs and sets the session data
        document.getElementById("username").textContent = data.session.game_name + "#" + data.session.game_tag;
        document.getElementById("usernameNav").textContent = data.session.game_name + "#" + data.session.game_tag;
        document.getElementById("connectionLabel").textContent = data.session.resource + " | " + data.session.state;
        document.getElementById("accountName").textContent = `Account Name | ${data.session.name.length == 0 ? data.session.game_name : data.session.name}`;
        document.getElementById("pid").textContent = "PlayerID | " + data.session.puuid;
        document.getElementById("region").textContent = "Region | " + data.session.region;
        document.getElementById("port").textContent = "Session Port | " + data.port;
        document.getElementById("password").textContent = "Lockpass | " + data.password;
        document.getElementById("discordRpc").value = data.config.discordRpc;
        document.getElementById("experimentalFeatures").value = data.config.experimental;
    }).catch(function() {
    console.log("Error.");
});
