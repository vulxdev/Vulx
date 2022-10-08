/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

fetch("http://127.0.0.1:/userSession").then(function(response) {
    return response.json();
    }).then(function(data) {
        if(data.config.firstLaunch == true) {
            window.location.href = "setup";
        }
        if(data.config.experimental == true) {
            document.getElementById("experimentalNav").style.display = "flex";
        } else {
            if(!window.location.href.includes("dashboard")) {
                window.location.href = "dashboard";
            }
        }
        if(data.config.webTooltips == true) {
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip({
                    trigger : 'hover', 
                    container: 'body'
                });
              }); 
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
        document.getElementById("webTooltips").value = data.config.webTooltips;
        document.getElementById("languageSelection").value = data.config.languageSelection;

        if(data.config.languageSelection == 'english') {
            console.log("Language: English");
            //Do nothing. Language is defaulted to english
        }
        else if (data.config.languageSelection == 'german') {
            console.log("Language: German");
            //Time to translate
            document.body.innerHTML = document.body.innerHTML.replace('Statistics', 'Statistik');
            document.body.innerHTML = document.body.innerHTML.replace('Friends:', 'Freunde:');
            document.body.innerHTML = document.body.innerHTML.replace('Requests:', 'Anfragen:');
            document.body.innerHTML = document.body.innerHTML.replace('Time Elapsed:', 'Verstrichene Zeit:');
            document.body.innerHTML = document.body.innerHTML.replace('Presence', 'Präsenz');
            document.body.innerHTML = document.body.innerHTML.replace('Experimental', 'Experimentell');
            document.body.innerHTML = document.body.innerHTML.replace('Search Friends..', 'Nach Freunden suchen...');
            document.body.innerHTML = document.body.innerHTML.replace('Profil Status', 'Nach Freunden suchen...');
            document.body.innerHTML = document.body.innerHTML.replace('Score Ally', 'Punkte Freunde');
            document.body.innerHTML = document.body.innerHTML.replace('Score Enemy', 'Punkte Feind');
            document.body.innerHTML = document.body.innerHTML.replace('Profile Title', 'Profil Title');
            document.body.innerHTML = document.body.innerHTML.replace('Leaderboard', 'Bestenliste');
            document.body.innerHTML = document.body.innerHTML.replace('System Message', 'System Nachricht');
            document.body.innerHTML = document.body.innerHTML.replace('Message', 'Nachricht');
            document.body.innerHTML = document.body.innerHTML.replace('Message..', 'Nachricht..');
            document.body.innerHTML = document.body.innerHTML.replace('Made with ♡ by ', 'Gemacht mit ♡ von ');
            //document.body.innerHTML = document.body.innerHTML.replace('<a style="color: #007bff !important;" href="https://github.com/itssyfe">Syfe</a>', '<a style="color: #007bff !important;" href="https://github.com/itssyfe">Syfe</a><br>Übersetzung von NeXi2k');
            document.body.innerHTML = document.body.innerHTML.replace('No Rank', 'Kein Rank');
            document.body.innerHTML = document.body.innerHTML.replace('Disable Rank Display', 'Ranganzeige deaktivieren');
            document.body.innerHTML = document.body.innerHTML.replace('Special', 'Spezial');
            document.body.innerHTML = document.body.innerHTML.replace('Unused 1', 'Unbenutzt 1');
            document.body.innerHTML = document.body.innerHTML.replace('Unused 2', 'Unbenutzt 2');
            document.body.innerHTML = document.body.innerHTML.replace('Unranked', 'Ungewertet');
            document.body.innerHTML = document.body.innerHTML.replace('Unranked', 'Ungewertet');
            document.body.innerHTML = document.body.innerHTML.replace('Iron', 'Eisen');
            document.body.innerHTML = document.body.innerHTML.replace('Iron 1', 'Eisen 1');
            document.body.innerHTML = document.body.innerHTML.replace('Iron 2', 'Eisen 2');
            document.body.innerHTML = document.body.innerHTML.replace('Iron 3', 'Eisen 3');
            document.body.innerHTML = document.body.innerHTML.replace('Silver', 'Silber');
            document.body.innerHTML = document.body.innerHTML.replace('Silver 1', 'Silber 1');
            document.body.innerHTML = document.body.innerHTML.replace('Silver 2', 'Silber 2');
            document.body.innerHTML = document.body.innerHTML.replace('Silver 3', 'Silber 3');
            document.body.innerHTML = document.body.innerHTML.replace('Diamond', 'Diamant');
            document.body.innerHTML = document.body.innerHTML.replace('Diamond 1', 'Diamont 1');
            document.body.innerHTML = document.body.innerHTML.replace('Diamond 2', 'Diamont 2');
            document.body.innerHTML = document.body.innerHTML.replace('Diamond 3', 'Diamont 3');
            document.body.innerHTML = document.body.innerHTML.replace('Ascendant', 'Aufgestiegener');
            document.body.innerHTML = document.body.innerHTML.replace('Ascendant 1', 'Aufgestiegener 1');
            document.body.innerHTML = document.body.innerHTML.replace('Ascendant 2', 'Aufgestiegener 2');
            document.body.innerHTML = document.body.innerHTML.replace('Ascendant 3', 'Aufgestiegener 3');
            document.body.innerHTML = document.body.innerHTML.replace('Immortal', 'Unsterblicher');
            document.body.innerHTML = document.body.innerHTML.replace('Immortal 1', 'Unsterblicher 1');
            document.body.innerHTML = document.body.innerHTML.replace('Immortal 2', 'Unsterblicher 2');
            document.body.innerHTML = document.body.innerHTML.replace('Immortal 3', 'Unsterblicher 3');
            document.body.innerHTML = document.body.innerHTML.replace('Radiant 1', 'Radiant');
            document.body.innerHTML = document.body.innerHTML.replace('Vulx Profile Editor - Made with ♡ by', 'Vulx Profile Editor - Gemacht mit ♡ von ');
            document.body.innerHTML = document.body.innerHTML.replace('Settings', 'Einstellungen');
            document.body.innerHTML = document.body.innerHTML.replace('Session Stats', 'Sitzungsstatistik');
            document.body.innerHTML = document.body.innerHTML.replace('Account Settings', 'Account Einstellungen');
            document.body.innerHTML = document.body.innerHTML.replace('Experimental Features', '<font size="4px">Experimentelle Funktionen</font>');
            document.body.innerHTML = document.body.innerHTML.replace('DiscordRPC', '<font size="4px">Discord Status</font>');
            document.body.innerHTML = document.body.innerHTML.replace('Tool Tips', '<font size="4px">Tool-Tipps</font>');
            document.body.innerHTML = document.body.innerHTML.replace('Language', '<font size="4px">Sprache</font>');
            document.body.innerHTML = document.body.innerHTML.replace('Reset Account', '<font size="1px">Account zurücksetzen</font>');
        }
        else {
            console.log("Can't detect selected Language. Something broke?")
        }
    }).catch(function() {
    console.log("Error.");
});
