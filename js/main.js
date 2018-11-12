window.pageInit = function (settings) {
    if (settings) {
        loadpage();
        settings();
    }
};
pageInit(function () {
    
});

function loadpage() {
    for (var i = 0; i < 1; i++) {
        var item = $("div[loadpage='true']").first();
        if (item.length > 0 && item.attr("loadpage")) {
            console.log("loadpage: " + item.attr("loadpage-html"));
            item.load(item.attr("loadpage-html"));
            item.attr("loadpage", false);
            i--;
        }
    }
}
function Init(){
    
}