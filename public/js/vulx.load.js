/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// Loading screen for Vulx, this is the first thing that will be loaded (may remove this later)

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

$(window).on('load', async function () {
    await delay(500);
    document.getElementById("loading").classList.add("hide");
	$('#loading').bind('animationend', function() { $(this).remove(); }); 
}) 