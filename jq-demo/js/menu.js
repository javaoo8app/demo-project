pageInit(function () {
    console.log("menu.js start");
    var menuJson = [{
        'title': 'Demo',
        'dropdown': [{
            'title': 'Datatable',
            'url': 'html/demo/datatable.html'
        }, {
            'title': '2dolist',
            'url': 'html/demo/2dolist.html'
        }, {
            'title': 'Validation',
            'url': 'html/demo/validation.html'
        }, {
            'title': 'demo',
            'url': 'html/demo/demo.html'
        }]
    }, {
        'title': '2dolist2',
        'url': 'html/demo/2dolist2.html'
    }, {
        'title': 'Readfile',
        'url': 'html/demo/readfile.html'
    }, {
        'title': 'Dropdown',
        'dropdown': [{
            'title': 'Action',
            'url': ''
        }, {
            'title': 'Another',
            'url': ''
        }, {
            'title': 'Something',
            'url': ''
        }]
    }, {
        'title': 'Setting',
        'url': ''
    },{
        'title': 'Vue',
        'url': ''
    }];

    var navbarList = $('#list-tab');
    var navContent = $('#nav-tabContent');
    for (var i = 0; i < menuJson.length; i++) {
        var item = menuJson[i];
        if (item.dropdown) {
            var dropdown_menu = '<li class="nav-item dropdown">' +
                '<a class="nav-link dropdown-toggle" id="' + item.title + 'MenuLink" data-toggle="dropdown"' +
                'href="#" aria-haspopup="true" aria-expanded="false">' + item.title + '</a>' +
                '<div class="dropdown-menu" aria-labelledby="' + item.title + 'MenuLink"></div></li>';
            navbarList.append(dropdown_menu);
            var dropdown_menu = navbarList.find('#' + item.title + 'MenuLink').next('div.dropdown-menu');
            for (var j = 0; j < item.dropdown.length; j++) {
                var dropdown_item = item.dropdown[j];
                var dropdown_item_a = '<a class="dropdown-item" data-toggle="list" href="#list-' + dropdown_item.title + '" role="tab" aria-controls="list-' + dropdown_item.title + '">' + dropdown_item.title + '</a>';
                dropdown_menu.append(dropdown_item_a);

                creatContent(dropdown_item);
            }
        } else {
            var list_item = '<li class="nav-item">' +
                '<a class="nav-link" id="list-' + item.title + '-list" data-toggle="list" href="#list-' + item.title + '" role="tab"' +
                'aria-controls="list-' + item.title + '">' + item.title + '</a></li>';

            navbarList.append(list_item);

            creatContent(item);

        }
    }
    //close menu with click
    var navToggler = $('.navbar-toggler');
    navbarList.find('li a').on('click', function () {
        var b = navToggler.attr('aria-expanded');
        if (b == 'true' && $(this).attr('href').length > 1) {
            navToggler.click(); //bootstrap 4.x
        }
    });
    console.log("menu.js end");

    function creatContent(item) {
        var Content_item = '<div class="tab-pane fade" id="list-' + item.title + '" role="tabpanel" aria-labelledby="list-' + item.title + '-list"></div>';
        navContent.append(Content_item);

        if (item.url.length > 0) {
            navContent.find('#list-' + item.title + '').html('<div loadpage-html="' + item.url + '" loadpage="true"></div>');
        } else {
            navContent.find('#list-' + item.title + '').html(item.title);
        }
    }
});