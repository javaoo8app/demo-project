pageInit(function () {
    console.log("demo.js start");
    $("#hide").click(function () {
        $("p").hide();
    });
    $("#show").click(function () {
        $("p").show();
    });
    console.log("demo.js end");
});