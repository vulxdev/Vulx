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
        var username = document.getElementById("username");
        var usernameNav = document.getElementById("usernameNav");
            username.textContent = data.session.game_name + "#" + data.session.game_tag;
            usernameNav.textContent = data.session.game_name + "#" + data.session.game_tag;
        var connection = document.getElementById("connectionLabel");
            connection.textContent = data.session.resource + " | " + data.session.state;
        var account = document.getElementById("accountName");
            account.textContent = `Account Name | ${data.session.name.length == 0 ? data.session.game_name : data.session.name}`;
        var pid = document.getElementById("pid");
            pid.textContent = "PlayerID | " + data.session.puuid;
        var region = document.getElementById("region");
            region.textContent = "Region | " + data.session.region;
        var port = document.getElementById("port");
            port.textContent = "Session Port | " + data.port;
        var password = document.getElementById("password");
            password.textContent = "Lockpass | " + data.password;
        var discord = document.getElementById("discordRpc");
            discord.value = data.config.discordRpc;
        var experimental = document.getElementById("experimentalFeatures");
            experimental.value = data.config.experimental;
    }).catch(function() {
    console.log("Error.");
});
