
page = {};

page.load = function (page, params, closeDrawer) {
    let layout = document.querySelector('.mdl-layout');
    if (closeDrawer && layout.MaterialLayout) layout.MaterialLayout.toggleDrawer();

    $.get(page + ".html", function(data, status) {
        if (status == "success") {
            resp = data.split("{{nav-body-separation}}");
            document.querySelector(".mdl-navigation").innerHTML = resp[0];
            document.getElementById("page-content").innerHTML = resp[1];
            componentHandler.upgradeDom();
            if (window[page] && window[page].load) window[page].load(params);
            pageStack.push({page: page, params: params});
            console.log("Moving to page: " + page);
            page.current = page;
        } else  console.warn('Error retrieving: ' + page);
    }, "text");
}

page.hideOffilineWarning = function() {
    $("#offline-content").hide();
    $("#page-content").show();
}

page.showOfflineWarning= function() {
    $("#offline-content").show();
    $("#page-content").hide();
}

page.showToast = function (message) {
    let snackbarContainer = document.querySelector('#info-toaster');
    snackbarContainer.MaterialSnackbar.showSnackbar({message: message});
}
