const fs = require('fs');

class Tiket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TiketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarContador();
        }

    }

    reiniciarContador() {

        this.ultimo = 0;
        console.log('Se ha reiniciado el sistema de ticket');
        this.tickets = [];
        this.ultimos4 = [];
        this.guardarDatos();
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Tiket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarDatos();
        return `Ticket: ${ this.ultimo}`;
    }

    getActual() {
        return `Ticket: ${ this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(mostrador) {

        if (this.tickets.length == 0) {
            return 'NO existen tickets pendientes'
        } else {
            let numeroTiket = this.tickets[0].numero;
            this.tickets.shift();

            let atenderTicket = new Tiket(numeroTiket, mostrador);
            this.ultimos4.unshift(atenderTicket);

            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); //Elimina ultimo elemento
            }

            this.guardarDatos();
            return atenderTicket;
        }
    }

    guardarDatos() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonString);

    }

}

module.exports = {
    TiketControl
}