const searchBar = document.querySelector('input[type="text"]');

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
        
}

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