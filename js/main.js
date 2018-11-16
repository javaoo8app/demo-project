Init();
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
            if (html.length > 0) {
                console.log("loadpage: " + html);
                item.load(html);
            }
            item.attr("loadpage", false);
            i--;
        }
    }
}

function Init() {
    //console訊息
    window.clue = function (string) {
        console.log('%c clue:' + string + ' ', 'background: Bisque; color: Maroon');
    }
    window.debug = function (string) {
        console.log('%c debug:' + string + ' ', 'background: Maroon; color: Bisque');
    }
    window.API = {
        //判斷是否是JSON格式
        isJSON: function (json) {
            if (typeof json == 'string') {
                str = json;
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (e) {
                    console.log('error：' + str + '!!!' + e);
                    return false;
                }
            } else {
                obj = json;
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        //開頭大寫
        capitalizeFirstLetter: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        //建立DataTable
        createDatatable: function (tableTag, json) {
            if (tableTag[0].tagName == "TABLE" && API.isJSON(json)) {
                tableTag.append('<thead><tr></tr></thead>');
                var thead_tr = tableTag.find('thead tr');
                tableTag.append('<tbody></tbody>');
                var tbody = tableTag.find('tbody');
                //column
                for (keyName in json[0]) {
                    thead_tr.append('<th>' + keyName + '</th>');
                }
                //data
                for (var i = 0; i < json.length; i++) {
                    var object = json[i];
                    var tr = '<tr>';
                    var _tr = '</tr>';
                    for (keyName in object) {
                        tr += '<td>' + object[keyName] + '</td>';
                    }
                    tbody.append(tr + _tr);
                }
                var datatable = tableTag.DataTable();
                //focus mouse over
                tableTag.on('mouseenter', 'td', function () {
                    console.log();
                    if (datatable.cell(this)[0].length > 0) {
                        var colIdx = datatable.cell(this).index().column;
                        $(datatable.cells().nodes()).removeClass('highlight');
                        $(datatable.column(colIdx).nodes()).addClass('highlight');
                    }
                });
                //顯示選取數量
                tableTag.on('click', 'tr', function () {
                    $(this).toggleClass('selected');
                    clue(datatable.rows('.selected').data().length + ' row(s) selected');
                });
                //長案自動刪除
                tableTag.toggleClass('selected').on("taphold", function () {
                    (datatable.row('.selected')).remove().draw(false);
                });

            } else {
                if (!API.isJSON(json)) {
                    clue(tableTag.attr('id') + ' does not have JSON!');
                }
                if (tableTag[0].tagName != "TABLE") {
                    clue(tableTag.attr('id') + ' is not a TABLE tag! It is ' + tableTag[0].tagNam);
                }
            }
        },
        //建立Form表單
        createForm: function (formTag, json) {
            if (formTag[0].tagName == "FORM" && API.isJSON(json)) {
                for (keyName in json[0]) {
                    formTag.append('<div class="form-group">' +
                        '<label for="' + keyName + '" class="col-form-label">' + API.capitalizeFirstLetter(keyName) + ':</label>' +
                        '<input type="text" class="form-control" id="' + keyName + '">' +
                        '</div>');
                }
            } else {
                if (!API.isJSON(json)) {
                    console.log(formTag.attr('id') + ' does not have JSON!');
                }
                if (formTag[0].tagName != "FORM") {
                    clue(formTag.attr('id') + ' is not a FORM tag! It is ' + formTag[0].tagNam);
                }
            }
        },
        //建立Dialog
        createDialog: function (modalBody, title) {
            if (modalBody.attr('class') == "modal-body") {

            } else {
                clue(modalBody.attr('id') + ' is not a modal-body class! It is ' + modalBody.attr('class'));
            }
        }

    }
}