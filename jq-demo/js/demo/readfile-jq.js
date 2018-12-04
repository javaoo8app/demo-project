/* global $, document, console */
$(document).ready(function (){
    // http://stackoverflow.com/questions/9898813/jquery-wait-till-multiple-get-requests-are-successully-processed
    var f1 = 'https://raw.githubusercontent.com/g0v/potluckmap/gh-pages/data/shop-clothes.csv';
    var f2 = 'https://raw.githubusercontent.com/g0v/potluckmap/gh-pages/data/shop-gift.geojson';
    var clothes, gift;
    clothes = $.get(f1);
    gift = $.get(f2);
    $.when(clothes, gift).done(init);
});

function init(clothes, gift) {

    console.log('clothes: ', clothes, ' \ngift', gift);

    clothes = clothes[0];
    gift = gift[0];

    $('#pre_display').text(
	'鹽埕服飾店：\n' + clothes + '\n鹽埕禮品店：\n' + gift
    );

    // https://datatables.net/examples/data_sources/js_array.html
    var cst = []; // clothes shop table
    clothes = clothes.split('\n');
    var header = clothes.shift();
    header = header.split(',').map(function (x) { return {title:x}; });
    clothes.forEach(function (row) {
	if (row.length > 1) {
	    cst.push(row.split(','));
	}
    });
    // console.log('header: ', header, ' \ncst', cst);
    $('#table_display').DataTable({ columns: header, data: cst });

    var jqTree;
    jqTree = json2jqTree('鹽埕禮品店', JSON.parse(gift));
    // console.log(jqTree);
    $('#tree_display').tree({
	data: [jqTree],
	autoOpen: true,
	onCreateLi: function(node, $li) {
	    if ('value' in node) {
		$li.find('.jqtree-title').
		    after(': <span class="value">' + node.value + '</span>');
	    }
	}
    });
}

function json2jqTree(name, jsdata) {
    if (jsdata instanceof Array) {
	return {
	    name: name,
	    children: jsdata.map(function (x,i) {
		return json2jqTree('['+i+']',x);
	    })
	};
    } else if (typeof jsdata == 'object') {
	return {
	    name: name,
	    children: Object.keys(jsdata).map(function (x) {
		return json2jqTree(x, jsdata[x]);
	    })
	};
    } else {
	return {
	    name: name,
	    value: jsdata
	};
    }
}

