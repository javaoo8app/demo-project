pageInit(function () {
    console.log("datatable.js start");
    var table = $('#example').DataTable();
    // var table = $('#example').DataTable({
    //     "columnDefs": [{
    //         "searchable": false,
    //         "orderable": false,
    //         "targets": 0
    //     }],
    //     "order": [
    //         [1, 'asc']
    //     ]
    // });

    // table.on('order.dt search.dt', function () {
    //     table.column(0, {
    //         search: 'applied',
    //         order: 'applied'
    //     }).nodes().each(function (cell, i) {
    //         cell.innerHTML = i + 1;
    //     });
    // }).draw();

    // $('#example tbody').on('mouseenter', 'td', function () {
    //     var colIdx = table.cell(this).index().column;

    //     $(table.cells().nodes()).removeClass('highlight');
    //     $(table.column(colIdx).nodes()).addClass('highlight');
    // });

    // $('#example tbody').on('click', 'tr', function () {
    //     $(this).toggleClass('selected');
    //     console.log(table.rows('.selected').data().length + ' row(s) selected');
    // });

    // $('#example').toggleClass('selected').on("taphold", function () {
    //     (table.row('.selected')).remove().draw( false );
    // });
    console.log("datatable.js end");
});