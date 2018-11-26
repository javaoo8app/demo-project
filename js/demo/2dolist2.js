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
    $('#impcbutton').click(function () {
        var getFileContent = function (fileInput, callback) {
            if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
                //下面这一句相当于JQuery的：var file =$("#upload").prop('files')[0];
                var file = fileInput.files[0];
                if (window.FileReader) {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            callback(evt.target.result);
                        }
                    };
                    // 包含中文内容用gbk编码
                    reader.readAsText(file, 'UTF-8');
                }
            }
        };
        /**
         * upload内容变化时载入内容
         */
        document.getElementById('impcbutton').onchange = function () {

            getFileContent(this, function (str) {
                var data = JSON.parse(str).data;
                for(var i = 0; i<data.length; i++){
                    datatable.row.add(data[i]).draw(false);
                }
            });
        };
    });
    $('#impbutton').click(function () {
        datatable.importPath('ajax/Export.json');
    });
    $('#delbutton').click(function () {
        if (datatable.rows('.selected').data().length > 0) {
            API.simpleDialog({
                'title': '刪除',
                'content': '確認要刪除嗎?',
                'negative': {
                    'btn': '取消'
                },
                'positive': {
                    'btn': '確定',
                    'fun': function () {
                        datatable.row('.selected').remove().draw(false);
                    }
                }
            });
        }

    });
    console.log("2dolist2.js end");
});