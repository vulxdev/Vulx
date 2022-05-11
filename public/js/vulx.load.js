$(window).on('load', async function () {
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    await delay(1000)
    var loading = document.getElementById("loading");
      loading.classList.add("hide");
    await delay(500)
    $('#loading').hide(); 
    //This is such a digusting way to make this work but fuck it
}) 