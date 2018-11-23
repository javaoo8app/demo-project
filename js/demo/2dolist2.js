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
        'columnSet': [], //子選項
        'readonly': 'fasle', //唯讀
        'required': 'true' //驗證

    }, {
        'columnId': 'detail',
        'columnName': '詳細說明',
        'columnType': 'input',
        'columnSet': [],
        'readonly': 'fasle',
        'required': 'true'
    }, {
        'columnId': 'status',
        'columnName': '狀態',
        'columnType': 'select',
        'columnSet': ['已完成', '未完成', '持續'],
        'readonly': 'fasle',
        'required': 'true'
    }, {
        'columnId': 'createDate',
        'columnName': '建立時間',
        'columnType': 'datetime-local',
        'columnSet': 'currentTime',
        'readonly': 'true',
        'required': 'true'
    }, {
        'columnId': 'createUser',
        'columnName': '建立者',
        'columnType': 'input',
        'columnSet': [],
        'readonly': 'fasle',
        'required': 'true'
    }]
    // var datatable = $('#2dolist_table').createDatatableWithData(dolistJson);
    var datatable = $('#2dolist_table').createDatatable(columnJson);
    var dialog = $('#exampleModalCenter');
    var form = $('form#add-list').createForm(columnJson);
    dialog.createDialog({
        'negative': {
            'btn': '取消'
        },
        'positive': {
            'btn': '確定',
            'fun': function () {
                if (form.validationEngine()) {
                    var data = form.getFormData();
                    console.log(data);
                    datatable.row.add(data).draw(false);
                    dialog.modal('hide');
                    form.clear();
                }
            }
        }
    });

    $('#expbutton').click(function () {
        datatable.export();
    });
    $('#impbutton').click(function () {
        datatable.import('ajax/Export.json').ajax.reload();
    });    
    $('#delbutton').click(function () {
        if (datatable.rows('.selected').data().length>0) {
            API.simpleDialog({
                'title': '刪除',
                'content': '確認要刪除嗎?',
                'negative': {
                    'btn': '取消'
                },
                'positive': {
                    'btn': '確定',
                    'fun': function () {
                        datatable.row('.selected').remove().draw( false );
                    }
                }
            });
        }

    });
    console.log("2dolist2.js end");
});