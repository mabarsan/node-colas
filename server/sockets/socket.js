const { io } = require('../server');
const { TiketControl } = require('../classes/ticket-control');

const ticketControl = new TiketControl;


io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getActual(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                erro: true,
                mensaje: 'Escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.ultimos4
        });
    })

    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguienteTicket();
        console.log(siguienteTicket);
        callback(siguienteTicket);
    });


});