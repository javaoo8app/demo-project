Init();
Run();
window.pageInit = function (settings) {
    if (settings) {
        settings();
        loadpage();
    }
};
pageInit(function () {
    console.log('main.js start');

    console.log('main.js end');
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
    $.extend(window, {
        //console訊息
        clue: function (string) {
            console.log('%c clue:' + string + ' ', 'background: Bisque; color: Maroon');
        },
        debug: function (string) {
            console.log('%c debug:' + string + ' ', 'background: Maroon; color: Bisque');
        },
        API: {
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
            //將時間物件轉換成dateTimeLocal格式
            dateTimeLocalFormat: function (date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = 'T' + hours + ':' + minutes;
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + strTime;
            },
            //啟動動態時間
            dateTimeLocalTiming: function () {
                //setInterval會每1000毫秒執行一次，也就是每1秒獲取一次時間
                dateTimeLocalTiming = setInterval(function () {
                    var dateTimeLocal = $("[type='datetime-local'][nowtime='true']");
                    dateTimeLocal.attr('value', API.dateTimeLocalFormat(new Date()));
                }, 100);
            },


            //快速建立Dialog
            simpleDialog: function (setting) {
                //範例:
                // setting = ({
                //     'title': 'dialogName',
                //     'content': 'content',
                //     'negative': {
                //         'btn': 'cencle',
                //         'fun': function () {}
                //     },
                //     'positive': {
                //         'btn': 'success',
                //         'fun': function () {}
                //     }
                // });
                var title = setting.title || 'DEMO';
                var content = setting.content || '';
                var positiveButton = setting.positive.btn || 'Save changes';
                var negativeButton = setting.negative.btn || 'Close';

                var has = $('body').find('#simpleDialog').length == 0;
                if (has) {
                    $('body').append('<div id="simpleDialog">' +
                        '<div class="modal-body"></div></div>');
                }
                var simpleDialog = $('body').find('#simpleDialog');
                var modalbody = simpleDialog.find('.modal-body');
                modalbody.html(content);
                simpleDialog.attr({
                    "class": "modal fade",
                    "tabindex": "-1",
                    "role": "dialog",
                    "aria-labelledby": "exampleModalCenterTitle",
                    "aria-hidden": "true"
                });

                if (has) {
                    simpleDialog.append('<div class="modal-dialog modal-dialog-centered-top" role="document">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<h5 class="modal-title">' + title + '</h5>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button></div>' +
                        ' <div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary negative" data-dismiss="modal">' + negativeButton + '</button>' +
                        '<button type="button" class="btn btn-primary positive" data-dismiss="modal">' + positiveButton + '</button>' +
                        '</div></div></div></div>');
                    simpleDialog.find('.modal-footer').before(modalbody);

                    simpleDialog.find('.modal-footer .negative').click(function () {
                        setting.negative.fun && setting.negative.fun();
                    });
                    simpleDialog.find('.modal-footer .positive').click(function () {
                        setting.positive.fun && setting.positive.fun();
                    });
                } else {
                    simpleDialog.find('.modal-title').html(title);
                    var negative = simpleDialog.find('.modal-footer .negative');
                    negative.html(negativeButton);
                    var positive = simpleDialog.find('.modal-footer .positive');
                    positive.html(positiveButton);
                    negative.click(function () {
                        setting.negative.fun && setting.negative.fun();
                    });
                    positive.click(function () {
                        setting.positive.fun && setting.positive.fun();
                    });
                }
                simpleDialog.modal('show');

            },
            //滑鼠長按
            mouseHoldDown: function (thisObject, functionCode, holdTime) {
                var timeStart, timeEnd, time
                if (!holdTime) {
                    holdTime = 1000;
                }
                thisObject.mousedown(function () {
                    holdDown(functionCode);
                });
                thisObject.mouseup(function () {
                    holdUp();
                });

                function getTimeNow() {
                    var now = new Date();
                    return now.getTime();
                }

                function holdDown(functionCode) {
                    //獲取滑鼠按下時間
                    timeStart = getTimeNow();

                    //setInterval會每100毫秒執行一次，也就是每100毫秒獲取一次時間
                    time = setInterval(function () {
                        timeEnd = getTimeNow();

                        //檢查時間差
                        if (timeEnd - timeStart > holdTime) {
                            //清除時間
                            clearInterval(time);
                            //執行方法
                            functionCode();
                        }
                    }, 100);
                }

                function holdUp() {
                    //清除時間紀錄
                    clearInterval(time);
                }
            }
        }
    });
    //滑鼠長按
    $.fn.mouseHoldDown = function (functionCode, holdTime) {
        API.mouseHoldDown($(this), functionCode, holdTime);
    }

}

function Run() {
    API.dateTimeLocalTiming();
    //建立DataTable
    $.fn.createDatatableWithData = function (json) {
        if ($(this)[0].tagName == "TABLE" && API.isJSON(json)) {
            $(this).append('<thead><tr></tr></thead>');
            var thead_tr = $(this).find('thead tr');
            $(this).append('<tbody></tbody>');
            var tbody = $(this).find('tbody');
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
            var datatable = $(this).DataTable({
                responsive: true
            });
            //focus mouse over
            $(this).on('mouseenter', 'td', function () {
                console.log();
                if (datatable.cell(this)[0].length > 0) {
                    var colIdx = datatable.cell(this).index().column;
                    $(datatable.cells().nodes()).removeClass('highlight');
                    $(datatable.column(colIdx).nodes()).addClass('highlight');
                }
            });
            //顯示選取數量
            $(this).on('click', 'tr', function () {
                $(this).toggleClass('selected');
                clue(datatable.rows('.selected').data().length + ' row(s) selected');
            });
            //長案自動刪除
            // $(this).toggleClass('selected').on("taphold", function () {
            //     (datatable.row('.selected')).remove().draw(false);
            // });
            return datatable

        } else {
            if (!API.isJSON(json)) {
                clue($(this).attr('id') + ' does not have JSON!');
            }
            if ($(this)[0].tagName != "TABLE") {
                clue($(this).attr('id') + ' is not a TABLE tag! It is ' + $(this)[0].tagNam);
            }
        }
    }
    $.fn.createDatatable = function (json) {
        if ($(this)[0].tagName == "TABLE" && API.isJSON(json)) {
            $(this).append('<thead><tr></tr></thead>');
            var thead_tr = $(this).find('thead tr');
            $(this).append('<tbody></tbody>');
            var tbody = $(this).find('tbody');
            //column
            for (i in json) {
                thead_tr.append('<th>' + json[i].columnName + '</th>');
            }
            var datatable = $(this).DataTable({
                responsive: true
            });
            //focus mouse over
            $(this).on('mouseenter', 'td', function () {
                if (datatable.cell(this)[0].length > 0) {
                    var colIdx = datatable.cell(this).index().column;
                    $(datatable.cells().nodes()).removeClass('highlight');
                    $(datatable.column(colIdx).nodes()).addClass('highlight');
                }
            });
            //顯示選取數量
            $(this).on('click', 'tr', function () {
                $(this).toggleClass('selected');
                // clue(datatable.rows('.selected').data().length + ' row(s) selected');
            });
            //長案自動刪除
            // $(this).toggleClass('selected').on("taphold", function () {
            //     (datatable.row('.selected')).remove().draw(false);
            // });
            datatable.import = function(path){            
                return $(this).DataTable({
                    responsive: true,
                    "ajax": path
                });
            }
            datatable.export = function () {
                var data = datatable.buttons.exportData();

                $.fn.dataTable.fileSave(
                    new Blob([JSON.stringify(data)]),
                    'Export.json'
                );
                return datatable;
            }
            return datatable;

        } else {
            if (!API.isJSON(json)) {
                clue($(this).attr('id') + ' does not have JSON!');
            }
            if ($(this)[0].tagName != "TABLE") {
                clue($(this).attr('id') + ' is not a TABLE tag! It is ' + $(this)[0].tagNam);
            }
        }
    }
    //建立Form表單
    $.fn.createForm = function (json) {
        var selectDef = '請選擇';
        var form;
        var validationEngineStatus;
        var formObj = {
            getFormData: function () {
                var formGroup = form.find('.form-group').first();
                var formdata = [];
                while (formGroup.attr('class') == 'form-group' && formGroup.length > 0) {
                    var tag = formGroup.children().last();
                    var id = tag.attr('id');
                    var val = tag.val();
                    if (tag[0].tagName == "SELECT" && val == selectDef) {
                        val = '';
                    }
                    formdata.push(val);
                    formGroup = formGroup.next();
                }
                return formdata;
            },
            validationEngine: function () {
                form.find('input.submit').click();
                return validationEngineStatus;
            },
            clear: function () {
                setTimeout(function () {
                    var formGroup = form.find('.form-group').first();
                    while (formGroup.attr('class') == 'form-group' && formGroup.length > 0) {
                        var tag = formGroup.children().last();
                        if (tag[0].tagName == "INPUT" && tag.attr("type") == "datetime-local") {
                            tag.attr('value', API.dateTimeLocalFormat(new Date()));
                        } else if (tag[0].tagName == "INPUT") {
                            tag.val('');
                        } else if (tag[0].tagName == "SELECT") {
                            tag[0].selectedIndex = 0;
                        }
                        formGroup = formGroup.next();
                    }
                }, 500);

            }
        };
        if ($(this)[0].tagName == "FORM" && API.isJSON(json)) {
            // var columnJson = [{
            //     'columnId': '', //欄位ID
            //     'columnName': '', //欄位名稱
            //     'columnType': '', //欄位型態(input，select，file，password，datetime)
            //     'columnSet': [],
            //     'readonly': '',
            //     'required': ''
            // }]
            for (x in json) {
                if (json[x].columnType == 'input') {
                    $(this).append('<div class="form-group">' +
                        '<label for="' + json[x].columnId + '" class="col-form-label">' + json[x].columnName + ':</label>' +
                        '<input type="text" class="form-control" id="' + json[x].columnId + '">' +
                        '</div>');
                } else if (json[x].columnType == 'select') {
                    $(this).append('<div class="form-group">' +
                        '<label for="' + json[x].columnId + '">' + json[x].columnName + ':</label>' +
                        '<select class="form-control" id="' + json[x].columnId + '">' +
                        '</select></div>');
                    var childParent = $(this).find('#' + json[x].columnId);
                    childParent.append('<option value="">' + selectDef + '</option>');
                    for (j in json[x].columnSet) {
                        childParent.append('<option value="' + json[x].columnSet[j] + '">' + json[x].columnSet[j] + '</option>');
                    }
                } else if (json[x].columnType == 'file') {
                    $(this).append('<div class="form-group">' +
                        '<label for=' + json[x].columnId + '">' + json[x].columnName + ':</label>' +
                        '<input type="file" class="form-control-file" id="' + json[x].columnId + '"></div>');
                } else if (json[x].columnType == 'password') {
                    $(this).append('<div class="form-group">' +
                        '<label for=' + json[x].columnId + '">' + json[x].columnName + ':</label>' +
                        '<input type="password" class="form-control" id="' + json[x].columnId + '" placeholder="Password">');
                } else if (json[x].columnType == 'datetime-local') {
                    var dataTime = json[x].columnSet;
                    var nowtimeTag = '';
                    if (json[x].columnSet == 'currentTime') {
                        dataTime = new Date();
                        nowtimeTag = 'nowtime="true"';
                    }
                    $(this).append('<div class="form-group">' +
                        '<label for=' + json[x].columnId + '">' + json[x].columnName + ':</label>' +
                        '<input type="datetime-local" class="form-control" ' + nowtimeTag + ' id="' + json[x].columnId + '" value="' + API.dateTimeLocalFormat(dataTime) + '">');

                }
                var formGroup = $(this).find('.form-group').last();
                //isReadonly?
                var input = formGroup.find('label').next();
                if (json[x].readonly == 'true') {
                    input.attr('readonly', true);
                } else {
                    input.removeAttr('readonly');
                }
                //isRequired?
                if (json[x].required == 'true') {
                    input.attr('data-validation-engine', 'validate[required]');
                } else {
                    input.removeAttr('data-validation-engine');
                }
            }
            $(this).append('<input class="submit invisible" type="submit" />');

            $(this).validationEngine('attach', {
                onValidationComplete: function (form, status) {
                    validationEngineStatus = status;
                }
            });

            form = $(this);
            return formObj;
        } else {
            if (!API.isJSON(json)) {
                clue($(this).attr('id') + ' does not have JSON!');
            }
            if ($(this)[0].tagName != "FORM") {
                clue($(this).attr('id') + ' is not a FORM tag! It is ' + formTag[0].tagNam);
            }
        }
    }
    //建立自訂Dialog
    $.fn.createDialog = function (setting) {
        //範例:
        // setting = ({
        //     'title': 'dialogName',
        //     'negative': {
        //         'btn': 'cencle',
        //         'fun': function () {}
        //     },
        //     'positive': {
        //         'btn': 'success',
        //         'fun': function () {}
        //     }
        // });
        var title = setting.title || 'DEMO';
        var positiveButton = setting.positive.btn || 'Save changes';
        var negativeButton = setting.negative.btn || 'Close';
        var modalbody = $(this).find('.modal-body');
        if (modalbody) {
            $(this).attr({
                "class": "modal fade",
                "tabindex": "-1",
                "role": "dialog",
                "aria-labelledby": "exampleModalCenterTitle",
                "aria-hidden": "true"
            });
            $(this).append('<div class="modal-dialog modal-dialog-centered-top" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title">' + title + '</h5>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button></div>' +
                ' <div class="modal-footer">' +
                '<button type="button" class="btn btn-secondary negative" data-dismiss="modal">' + negativeButton + '</button>' +
                '<button type="button" class="btn btn-primary positive">' + positiveButton + '</button>' +
                '</div></div></div></div>');
            $(this).find('.modal-footer').before(modalbody);
            $(this).find('.modal-footer .negative').click(function () {
                setting.negative.fun && setting.negative.fun();
            });
            $(this).find('.modal-footer .positive').click(function () {
                setting.positive.fun && setting.positive.fun();
            });

        } else {
            clue($(this).attr('id') + ' do not have modal-body class!');
        }
    }
}