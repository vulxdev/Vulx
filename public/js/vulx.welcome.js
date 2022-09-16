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
            window.location.href = "index.html";
        }
        var username = document.getElementById("username");
            username.textContent = data.session.game_name;
    }).catch(function() {
    console.log("Error.");
});

let discordRpc = false;
let testFeatures = false;

function stepOne() {
    document.getElementById("welcomeStepOne").style.display = "none";
    document.getElementById("welcomeStepTwo").style.display = "flex";
}
function stepTwo(value) {
    discordRpc = value;
    document.getElementById("welcomeStepTwo").style.display = "none";
    document.getElementById("welcomeStepThree").style.display = "flex";
}
function stepThree(value) {
    testFeatures = value;
    document.getElementById("welcomeStepThree").style.display = "none";
    document.getElementById("welcomeStepFour").style.display = "flex";
}
function stepFour() {
    document.getElementById("welcomeStepFour").style.display = "none";
    postSettings();
    window.location.href = "index.html";
}
//Add a new function for stepFive, This will ask the user if they want ValorantAPI to be enabled or not.
async function postSettings() {
    await fetch('http://127.0.0.1:/updateSettings', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                updateType: "settingsWelcome",
                firstLaunch: true,
                data: {
                    discordRpc: discordRpc,
                    testFeatures: testFeatures
                }
            }
        )
    });
}