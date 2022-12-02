$(document).ready(function () {
    $.ajax({
        'url': "https://638a7b4581df38ab3456fad7.mockapi.io/tareas/all",
        'method': "GET",
        'contentType': 'application/json'
    }).done(function (data) {
        console.log(data)
        $('#table_id').DataTable({
            "aaData": data,
            "columns": [
                {
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: '',
                },
                { "data": "nombre" },
                { "data": "fechainicial" },
                { "data": "fechafinal" },
                { "data": "responsable" },
                { "data": "status" }
            ]
        })
    })
    //var table = $('#table_id').DataTable();

    $('#table_id').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    async function getTareas() {
        const response = await fetch('https://apimocha.com/tareas-proyecto/tareas')
        const data = await response.json()

        data.forEach(tarea => {
            var row = table
                .row.add([tarea.nombre,
                tarea.fechainicial,
                tarea.fechafinal,
                tarea.responsable,
                tarea.status,
                    'he'])
                .draw()
                .node();

            $(row).data('descripcion', tarea.descripcion)
        });
    }

    $("#guardarTarea").on("click", function () {
        addTarea()
    })

    function addTarea() {
        $.ajax({
            contentType: 'application/json',
            method: 'POST',
            data: {
                "nombre": $("#nombre").val,
                "descripcion": $("#descripcion").val,
                "fechainicial": $("#fechainicial").val,
                "fechafinal": $("#fechafinal").val,
                "responsable": $("#responsable").val,
                "status": $("#status").val,
            },
            dataType: 'json',
            success: function (data) {
                console.log("device control succeeded");
            },
            error: function () {
                console.log("Device control failed");
            },
            processData: false,
            url: ''
        }
        )
    }

    async function deleteTarea() {

    }

    async function updateTarea() {

    }

    function format(d) {
        // `d` is the original data object for the row
        return (
            '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td>Full name:</td>' +
            '<td>' +
            d.descripción +
            '</td>' +
            '</tr>' +
            '</table>'
        );
    }

});

