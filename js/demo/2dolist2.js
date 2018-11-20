pageInit(function () {
    console.log("2dolist2.js start");
    var dolistJson = [{
        'name': '每周聚會',
        'detail': '談天說地聊八卦',
        'status': '持續-2',
        'createDate': '2018/11/15',
        'createUser': 'ti9ert0m6'
    }, {
        'name': '月底桌遊',
        'detail': '玩桌遊',
        'status': '持續-2',
        'createDate': '2018/11/15',
        'createUser': 'ti9ert0m6'
    }, {
        'name': '電話繳費',
        'detail': '每月的電話費',
        'status': '持續-2',
        'createDate': '2018/11/15',
        'createUser': 'ti9ert0m6'
    }];
    var columnJson = [{
        'columnName': '', //欄位名稱
        'columnType': '', //欄位型態(input，datetime，select，multiple select，textarea，file)
        'colunmChild': []
    }]

    var table = $('#2dolist_table');
    API.createDatatable(table, dolistJson);
    var dialog = $('#exampleModalCenter');
    // API.createDialog(dialog, "test");
    dialog.createDialog({
        'negative':{
            'btn':'取消'
        },
        'positive':{            
            'btn':'確定',
            'fun':function(){
                alert('確定');
            }
        }
    });
    var form = $('form#add-list');
    API.createForm(form, dolistJson);
    thisObject=$('#delbutton');
    API.mouseHoldDown(thisObject,function(){
        clue('長按');
    });







    console.log("2dolist2.js end");
});