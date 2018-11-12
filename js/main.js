window.pageInit = function (settings) {
    if (settings) {
        settings();
        loadpage();
    }
};
pageInit(function () {
    console.log('main.js start');
    
    console.log('main.js end')
});

function loadpage() {
    for (var i = 0; i < 1; i++) {
        var item = $("div[loadpage='true']").first();
        if (item.length > 0 && item.attr("loadpage")) {
            var html = item.attr("loadpage-html");
            if(html.length>0){
                console.log("loadpage: " + html);
                item.load(html);
            }
            item.attr("loadpage", false);
            i--;
        }
    }
}
function Init(){
    
}