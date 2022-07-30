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

fetch("http://127.0.0.1:/friends") //Add PUUID to div to allow for on click to locate you to their profile.
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
                searchBarResults.appendChild(friendCard);

                var friendPrivate = JSON.parse(atob(onlineFriends[j].private));

                var friendCardImg = document.createElement("img"); 
                friendCardImg.className = "searchPfp";
                friendCardImg.src = `https://media.valorant-api.com/playercards/${friendPrivate.playerCardId}/smallart.png`;
                friendCard.appendChild(friendCardImg);

                var friendCardActivity = document.createElement("img"); 
                friendCardActivity.className = "statusIcon";
                friendCardActivity.src = `https://cdn.discordapp.com/attachments/808062997180317767/1002731345287581766/online.png`;
                friendCard.appendChild(friendCardActivity);

                var friendBannerContainer = document.createElement("div");
                friendBannerContainer.className = "searchBannerCont";
                friendCard.appendChild(friendBannerContainer);

                var friendBannerImage = document.createElement("img");
                friendBannerImage.className = "searchBanner";
                friendBannerImage.src = `https://media.valorant-api.com/playercards/${friendPrivate.playerCardId}/wideart.png`;
                friendBannerContainer.appendChild(friendBannerImage);

                var friendSearchInfo = document.createElement("div");
                friendSearchInfo.className = "searchInfo";
                friendSearchInfo.id = "friend-search-info";
                friendCard.appendChild(friendSearchInfo);

                var friendNameText = document.createElement("h1");
                friendNameText.className = "themeName-large5 textOverflow";
                friendNameText.id = "friend-name";
                friendNameText.textContent = onlineFriends[j].game_name;
                friendSearchInfo.appendChild(friendNameText);

                var friendTitleText = document.createElement("h3");
                friendTitleText.style = "font-size: 18px; margin-top: -10px;";
                friendTitleText.textContent = await getTitleText(friendPrivate.playerTitleId);
                friendSearchInfo.appendChild(friendTitleText);
            }
        for (var j = 0; j < offlineFriends.length; j++) {
            var searchBarResults = document.getElementsByClassName("search-bar-results")[0]
            var friendCard = document.createElement("div");
                friendCard.className = "search-bar-results-card";
                searchBarResults.appendChild(friendCard);

                var friendCardImg = document.createElement("img"); 
                friendCardImg.className = "searchPfp";
                friendCardImg.src = `https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/smallart.png`;
                friendCard.appendChild(friendCardImg);

                var friendCardActivity = document.createElement("img"); 
                friendCardActivity.className = "statusIcon";
                friendCardActivity.src = `https://cdn.discordapp.com/attachments/808062997180317767/1002731345707016242/offline.png`;
                friendCard.appendChild(friendCardActivity);

                var friendBannerContainer = document.createElement("div");
                friendBannerContainer.className = "searchBannerCont";
                friendCard.appendChild(friendBannerContainer);

                var friendBannerImage = document.createElement("img");
                friendBannerImage.className = "searchBanner";
                friendBannerImage.src = `https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png`;
                friendBannerContainer.appendChild(friendBannerImage);

                var friendSearchInfo = document.createElement("div");
                friendSearchInfo.className = "searchInfo2";
                friendSearchInfo.id = "friend-search-info";
                friendCard.appendChild(friendSearchInfo);

                var friendNameText = document.createElement("h1");
                friendNameText.className = "themeName-large5 textOverflow";
                friendNameText.id = "friend-name";
                friendNameText.textContent = offlineFriends[j].game_name;
                friendSearchInfo.appendChild(friendNameText);
        }
        
}).catch((err) => console.log(err));