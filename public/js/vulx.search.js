/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

function searchFriends() {
    var input = document.getElementById("searchFriends");
    var filter = input.value.toUpperCase();

	var results = document.getElementsByClassName("search-bar-results")[0];

	var friends = results.children;
	
	for (var i = 0; i < friends.length; i++) {
		var friend = friends[i];
		var friendSearchInfo = friend.querySelector("#friend-search-info");
		var friendName = friendSearchInfo.querySelector("#friend-name").textContent;
		if (friendName.toUpperCase().indexOf(filter) > -1) {
			friend.style.display = "";
		} else {
			friend.style.display = "none";
		}
	}
}