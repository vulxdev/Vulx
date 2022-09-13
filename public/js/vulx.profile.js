const searchBar = document.querySelector('input[type="text"]');
import ranksJson from './ranks.json' assert {type: 'json'};

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

if(searchBar.addEventListener('focusin', (event) => {
    var overlay = document.getElementById("overlay");
    var searchBar = document.getElementById("searchBar");
        //Remove old class
        overlay.classList.remove("hidden");
        overlay.classList.remove("fadeout");
        searchBar.classList.remove("hidden");
        searchBar.classList.remove("fadeout");
        //Add new class
        overlay.classList.add("visible");
        overlay.classList.add("fadein");
        searchBar.classList.add("visible");
        searchBar.classList.add("fadein");
}));

function closeSearchBar() {
    var overlay = document.getElementById("overlay");
    var searchBar = document.getElementById("searchBar");
        //Remove old class
        overlay.classList.remove("visible");
        overlay.classList.remove("fadein");
        searchBar.classList.remove("visible");
        searchBar.classList.remove("fadein");
        //Add new class
        overlay.classList.add("hidden");
        overlay.classList.add("fadeout");
        searchBar.classList.add("hidden");
        searchBar.classList.add("fadeout");
        
} window.closeSearchBar = closeSearchBar;

let dropLoc = 0;
for(var i = 0; i < ranksJson.length; i++) {
    var ranksDropdown = document.getElementById("collapseRank");
    var rank = document.createElement("div");
    rank.setAttribute("class", "valorantDropdownItem");
    rank.setAttribute("id", i);

    var rankImg = document.createElement("img");
    rankImg.setAttribute("style", "height: 30px;");
    rankImg.setAttribute("class", "valorantRankImg");
    rankImg.setAttribute("src", `https://cdn.aquaplays.xyz/ranks/${ranksJson[i].id}.png`);
    rank.appendChild(rankImg);

    var rankName = document.createElement("h4");
    rankName.setAttribute("style", "font-size: 20px; padding-top: 2px;");
    rankName.setAttribute("class", "valorantRank");
    rankName.innerHTML = Object.keys(ranksJson[i])[1];
    rank.appendChild(rankName);

    var rankArrow = document.createElement("div");
    rankArrow.setAttribute("style", `top: ${dropLoc}px !important;`);
    rankArrow.setAttribute("data-toggle", "collapse");
    rankArrow.setAttribute("href", "#collapseRankSpecific" + i);
    rankArrow.setAttribute("role", "button");
    rankArrow.setAttribute("aria-expanded", "false");
    rankArrow.setAttribute("aria-controls", "collapseRankSpecific" + i);
    rankArrow.setAttribute("class", "arrow-left arrow-downV2");
    rankArrow.setAttribute("onclick", "rankDropdownToggle(this)");
    rankArrow.setAttribute("id", "rankArrow" + i);
    rank.appendChild(rankArrow);
          
    var rankSpecificDropdown = document.createElement("div");
    rankSpecificDropdown.setAttribute("data-parent", "#collapseRank");
    rankSpecificDropdown.setAttribute("style", `top: ${dropLoc}px !important;`);
    rankSpecificDropdown.setAttribute("id", "collapseRankSpecific" + i);
    rankSpecificDropdown.setAttribute("class", "collapse profileRankSpecificDropdown");
    rank.appendChild(rankSpecificDropdown);

    for(var j = 0; j < Object.values(ranksJson[i])[1].length; j++) {
        let rank = Object.values(ranksJson[i])[1][j];
        
        var rankSpecific = document.createElement("div");
        rankSpecific.setAttribute("class", "valorantDropdownItem");
        rankSpecific.setAttribute("id", j);
        rankSpecific.addEventListener('click', async (event) => {
            await selectRank(rank);
        });
        rankSpecificDropdown.appendChild(rankSpecific);

        var rankSpecificImg = document.createElement("img");
        rankSpecificImg.setAttribute("style", "height: 30px;");
        rankSpecificImg.setAttribute("class", "valorantRankImg");
        rankSpecificImg.setAttribute("src", `https://cdn.aquaplays.xyz/ranks/${rankName.innerHTML == "Special" ? 0 : rank}.png`);
        rankSpecific.appendChild(rankSpecificImg);

        const num = j+1;
        var rankSpecificName = document.createElement("h4");
        rankSpecificName.setAttribute("style", "font-size: 20px; padding-top: 2px;");
        rankSpecificName.setAttribute("class", "valorantRank");
        rankSpecificName.innerHTML = rankName.innerHTML + " " + num;
        rankSpecific.appendChild(rankSpecificName);
    }

    dropLoc += 45;
    ranksDropdown.appendChild(rank);
}

function rankDropdownToggle(el) {
	var rankDropdowns = document.querySelectorAll(".arrow-downV2");
	rankDropdowns.forEach(rankDropdown => {
		if (rankDropdown.id != "mainRankDropdown" && rankDropdown != el)
			rankDropdown.classList.remove("active")
	})
	el.classList.toggle("active")
} window.rankDropdownToggle = rankDropdownToggle;

function Notification(type, message) {
    if(type == true) {
        Toastify({ text: message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            className: "info",
        }).showToast();
    } else {
        Toastify({ text: message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            className: "info",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
}

async function selectRank(id) {
    await fetch('http://127.0.0.1:/updatePresence', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                flag: 2,
                rank: id
            }
        )
    }).then((response) => {
        Notification(true, "Rank updated successfully!");
        getProfile();
    }).catch((error) => {
        Notification(false, "An error occured while updating your rank!");
    });  
} window.selectRank = selectRank;

if ($('#valorantMatchStatus')[0].scrollWidth > $('#valorantMatchStatusContainer').innerWidth()) {
    const isHover = e => e.parentElement.querySelector(':hover') === e;    
    const valorantStatus = document.getElementById('valorantMatchStatus');
    document.addEventListener('mousemove', function checkHover() {
    const hovered = isHover(valorantStatus);
        if (hovered !== checkHover.hovered) {
            if(hovered == true) {
                var profile = document.getElementById("profile");
                var spacer = document.getElementById("bottomSpacer");
                var status = document.getElementById("valorantMatchStatus");
                var advertising = document.getElementsByClassName("vulxAdvertising");
                var background = document.getElementById('valorantMatchStatusContainer');
                var bgimage = getComputedStyle(background);

                profile.style.height = parseInt(bgimage.getPropertyValue('height')) + 505 - 37 + "px"
                spacer.style.top = parseInt(bgimage.getPropertyValue('height')) + 452 - 37 + "px" 
                status.style.whiteSpace = "normal";
                advertising[0].style.top = parseInt(bgimage.getPropertyValue('height')) + 475 - 37 + "px" 
            } else {
                var profile = document.getElementById("profile");
                var spacer = document.getElementById("bottomSpacer");
                var status = document.getElementById("valorantMatchStatus");
                var advertising = document.getElementsByClassName("vulxAdvertising");
                profile.style.height = "505px";
                spacer.style.top = "452px";
                status.style.whiteSpace = "nowrap";
                advertising[0].style.top = "475px";
            }
        }
    });
}   

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-autosave-url]").forEach((inputField) => {
        inputField.addEventListener("change", async () => {
        const name = inputField.getAttribute("name");
        const value = inputField.value;
        const url = inputField.dataset.autosaveUrl;

        const formData = new FormData();
        formData.append(name, value);
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    flag: 49,
                    status: formData.get("status"),
                    ally: formData.get("ally"),
                    enemy: formData.get("enemy"),
                }
            )
        }).then((response) => {
            Notification(true, "Profile updated successfully!");
            getProfile();
        }).catch((error) => {
            Notification(false, "An error occured while updating your profile!");
        })});
    });
});

function setupSlip(list) {       
    list.addEventListener('slip:beforewait', function(e){
        if (e.target.classList.contains('instant')) e.preventDefault();
    }, false);

    list.addEventListener('slip:beforeswipe', function(e){
        e.preventDefault();
    }, false);

    list.addEventListener('slip:reorder', function(e){                             
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);

        var olArray = []         
        var olChilds = document.getElementById("profileThemes").querySelectorAll('li');

        olChilds.forEach(child => olArray.push(child.id))

        return false;
    }, false);
    
    return new Slip(list);
}
setupSlip(document.getElementById('profileThemes'));