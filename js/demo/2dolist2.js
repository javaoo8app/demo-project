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
        'columnId': 'name', //欄位ID
        'columnName': '代辦事項', //欄位名稱
        'columnType': 'input', //欄位型態(input，select，file，password，datetime)
        'colunmChild': [], //子選項
        'readonly': 'fasle', //唯讀
        'required': 'fasle' //驗證

    }, {
        'columnId': 'detail',
        'columnName': '詳細說明',
        'columnType': 'input',
        'colunmChild': [],
        'readonly': 'fasle',
        'required': 'fasle'
    }, {
        'columnId': 'status',
        'columnName': '狀態',
        'columnType': 'select',
        'colunmChild': ['已完成', '未完成', '持續'],
        'readonly': 'fasle',
        'required': 'fasle'
    }, {
        'columnId': 'createDate',
        'columnName': '建立時間',
        'columnType': 'datetime',
        'colunmChild': [],
        'readonly': 'fasle',
        'required': 'fasle'
    }, {
        'columnId': 'createUser',
        'columnName': '建立者',
        'columnType': 'input',
        'colunmChild': [],
        'readonly': 'fasle',
        'required': 'fasle'
    }]
    var datatable = $('#2dolist_table').createDatatable(dolistJson);
    var dialog = $('#exampleModalCenter');
    // API.createDialog(dialog, "test");
    dialog.createDialog({
        'negative': {
            'btn': '取消'
        },
        'positive': {
            'btn': '確定',
            'fun': function () {
                var data = form.getFormData();
                console.log(data);
                var show = [];
                for(i in data){
                    show.push(data[i].val);
                }
                datatable.row.add(show).draw(false);
            }
        }
    });
    var form = $('form#add-list').createForm(columnJson);



    thisObject = $('#delbutton');
    API.mouseHoldDown(thisObject, function () {
        clue('長按');
    });







    console.log("2dolist2.js end");
});