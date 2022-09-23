/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

function searchFriends() {
    var input = document.getElementById("searchFriends");
	var friends = document.getElementsByClassName("search-bar-results")[0].children;
	
	for (var i = 0; i < friends.length; i++) {
		var friend = friends[i];
		var friendSearchInfo = friend.querySelector("#friend-search-info");
		var friendName = friendSearchInfo.querySelector("#friend-name").textContent;
		friendName.toUpperCase().indexOf(input.value.toUpperCase()) > -1 ? friend.style.display = "" : friend.style.display = "none";
	}
}