var socket = io();


var searchPamams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchPamams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
} else {
    var escritorio = searchPamams.get('escritorio');
    console.log(escritorio);
    $('h1').text('Escritorio ' + escritorio);


    $('button').on('click', function() {
        socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
            if (resp.numero) {
                label.text('ticket: ' + resp.numero);
            } else {
                label.text(resp);
                alert(resp);
            }
        });

    });


}