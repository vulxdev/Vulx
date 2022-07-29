function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.puuid === object2.puuid;
      });
    });
  }

function getTitleText(title) {
    return fetch(`https://valorant-api.com/v1/playertitles/${title}`)
        .then(res => res.json())
        .then(res => res.data.titleText);
}

function getSelfPuuid() {
    return fetch('http://127.0.0.1:/userSession')
        .then(res => res.json())
        .then(res => res.session.puuid)
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

        for (var i = 0; i < onlineFriends.length / 3; i++) {
            var friendCardsDiv = document.createElement("div");
            friendCardsDiv.className = "search-bar-results-cards";
            document.getElementsByClassName("search-bar-results")[0].appendChild(friendCardsDiv);

            for (var j = 0; j < 3; j++) {
                if (!onlineFriends[i * 3 + j]) break;

                var friendCard = document.createElement("div");
                friendCard.className = "search-bar-results-card";
                friendCardsDiv.appendChild(friendCard);

                var friendPrivate = await JSON.parse(atob(onlineFriends[i * 3 + j].private));

                var friendCardImg = document.createElement("img"); 
                friendCardImg.className = "searchPfp";
                friendCardImg.src = `https://media.valorant-api.com/playercards/${friendPrivate.playerCardId}/smallart.png`;
                friendCard.appendChild(friendCardImg);

                var friendBannerContainer = document.createElement("div");
                friendBannerContainer.className = "searchBannerCont";
                friendCard.appendChild(friendBannerContainer);

                var friendBannerImage = document.createElement("img");
                friendBannerImage.className = "searchBanner";
                friendBannerImage.src = `https://media.valorant-api.com/playercards/${friendPrivate.playerCardId}/wideart.png`;
                friendBannerContainer.appendChild(friendBannerImage);

                var friendSearchInfo = document.createElement("div");
                friendSearchInfo.className = "searchInfo";
                friendCard.appendChild(friendSearchInfo);

                var friendNameText = document.createElement("h1");
                friendNameText.className = "themeName-large5 textOverflow";
                friendNameText.textContent = onlineFriends[i * 3 + j].game_name;
                friendSearchInfo.appendChild(friendNameText);

                var friendTitleText = document.createElement("h3");
                friendTitleText.style = "font-size: 18px; margin-top: -10px;";
                friendTitleText.textContent = await getTitleText(friendPrivate.playerTitleId);
                friendSearchInfo.appendChild(friendTitleText);
            }
        }

        var searchBarResultsTitle = document.createElement("div");
        searchBarResultsTitle.className = "search-bar-results-title";
        document.getElementsByClassName("search-bar-results")[0].appendChild(searchBarResultsTitle);

        var searchBarResultsTitleTextDiv = document.createElement("div");
        searchBarResultsTitle.appendChild(searchBarResultsTitleTextDiv);

        var searchBarResultsTitleText = document.createElement("h5");
        searchBarResultsTitleText.textContent = "Offline Friends";
        searchBarResultsTitleText.style = "font-weight: bold;";
        searchBarResultsTitleTextDiv.appendChild(searchBarResultsTitleText);

        for (var i = 0; i < offlineFriends.length / 3; i++) {
            var friendCardsDiv = document.createElement("div");
            friendCardsDiv.className = "search-bar-results-cards";
            document.getElementsByClassName("search-bar-results")[0].appendChild(friendCardsDiv);

            for (var j = 0; j < 3; j++) {
                if (!offlineFriends[i * 3 + j]) break;

                var friendCard = document.createElement("div");
                friendCard.className = "search-bar-results-card";
                friendCardsDiv.appendChild(friendCard);

                var friendCardImg = document.createElement("img"); 
                friendCardImg.className = "searchPfp";
                friendCardImg.src = `https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/smallart.png`;
                friendCard.appendChild(friendCardImg);

                var friendBannerContainer = document.createElement("div");
                friendBannerContainer.className = "searchBannerCont";
                friendCard.appendChild(friendBannerContainer);

                var friendBannerImage = document.createElement("img");
                friendBannerImage.className = "searchBanner";
                friendBannerImage.src = `https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png`;
                friendBannerContainer.appendChild(friendBannerImage);

                var friendSearchInfo = document.createElement("div");
                friendSearchInfo.className = "searchInfo2";
                friendCard.appendChild(friendSearchInfo);

                var friendNameText = document.createElement("h1");
                friendNameText.className = "themeName-large5 textOverflow";
                friendNameText.textContent = offlineFriends[i * 3 + j].game_name;
                friendSearchInfo.appendChild(friendNameText);
            }
        }
        
    }).catch((err) => console.log(err));