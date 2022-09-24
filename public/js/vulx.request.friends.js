/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.puuid === object2.puuid;
      });
    });
  }

function getTitleText(title) {
    if (!title) return 'Friend';

    return fetch(`https://valorant-api.com/v1/playertitles/${title}`)
        .then(res => res.json())
        .then(res => res.data.titleText);
}

function getSelfPuuid() {
    return fetch('http://127.0.0.1:/userSession')
        .then(res => res.json())
        .then(res => res.session.puuid)
}

function newElement(type, className, id, src, style, textContent) {
    var element = document.createElement(type);
    element.className = className;
    element.id = id;
    element.src = src;
    element.textContent = textContent;
    element.style = style;
    return element;
}

fetch("http://127.0.0.1:/friends")
    .then(res => res.json())
    .then(async res => {
        var selfPuuid = await getSelfPuuid()
        var onlineFriends = res.onlineFriends;
        onlineFriends = onlineFriends.filter(friend => friend.private && friend.product == "valorant" && friend.game_name && friend.puuid != selfPuuid);
        onlineFriends = onlineFriends.sort((a, b) => a.game_name.localeCompare(b.game_name));

        var offlineFriends = res.friends;
        offlineFriends = offlineFriends.filter(friend => friend.game_name)
        offlineFriends = getDifference(offlineFriends, onlineFriends);
        offlineFriends = offlineFriends.sort((a, b) => a.game_name.localeCompare(b.game_name));

        for (var j = 0; j < onlineFriends.length; j++) {
            var searchBarResults = document.getElementsByClassName("search-bar-results")[0]
                var friendCard = document.createElement("div");
                friendCard.className = "search-bar-results-card";
                friendCard.id = onlineFriends[j].puuid;
                searchBarResults.appendChild(friendCard);

                var friendPrivate = JSON.parse(atob(onlineFriends[j].private));
                friendCard.appendChild(newElement("img", "searchPfp", null, `https://media.valorant-api.com/playercards/${friendPrivate.playerCardId}/smallart.png`));
                friendCard.appendChild(newElement("img", "statusIcon", null, `https://cdn.aquaplays.xyz/user/online.png`));
                friendCard.appendChild(newElement("div", "searchBannerCont"));
                friendCard.appendChild(newElement("img", "searchBanner", null, `https://media.valorant-api.com/playercards/${friendPrivate.playerCardId}/wideart.png`));
                
                var friendSearchInfo = friendCard.appendChild(newElement("div", "searchInfo", "friend-search-info"));
                
                friendSearchInfo.appendChild(newElement("h1", "themeName-large5 textOverflow", "friend-name", null, null, onlineFriends[j].game_name));
                friendSearchInfo.appendChild(newElement("h3", null, null, null, "font-size: 18px; margin-top: -10px;", await getTitleText(friendPrivate.playerTitleId)))
            }
        for (var j = 0; j < offlineFriends.length; j++) {
            var searchBarResults = document.getElementsByClassName("search-bar-results")[0]
            var friendCard = document.createElement("div");
                friendCard.className = "search-bar-results-card";
                searchBarResults.appendChild(friendCard);

                friendCard.appendChild(newElement("img", "searchPfp", null, `https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/smallart.png`));
                friendCard.appendChild(newElement("img", "statusIcon", null, `https://cdn.aquaplays.xyz/user/offline.png`));
                
                var friendBannerContainer = friendCard.appendChild(newElement("div", "searchBannerCont"));
                friendBannerContainer.appendChild(newElement("img", "searchBanner", null, `https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png`));
                
                var friendSearchInfo = friendCard.appendChild(newElement("div", "searchInfo2", "friend-search-info"));
                friendSearchInfo.appendChild(newElement("h1", "themeName-large5 textOverflow", "friend-name", null, null, offlineFriends[j].game_name));
        }
        
}).catch((err) => console.log(err));