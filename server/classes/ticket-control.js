const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []
        const data = require('../data/data.json')
        if (data.hoy === this.hoy) {
            this.tickets = data.tickets
            this.ultimo = data.ultimo
            this.ultimos4 = data.ultimos4
        } else
            this.reiniciarConteo()
    }

    siguiente() {
        this.ultimo += 1
        this.tickets.push(new Ticket(this.ultimo, null))
        this.grabarArchivo()

        return `Ticket ${this.ultimo}`
    }

    getUltimo() {
        return `El Último Ticket es: ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0)
            return 'No hay tickets'

        let numeroTicket = this.tickets.shift().numero
        let ultimoTicket = new Ticket(numeroTicket, escritorio)
        this.ultimos4.unshift(ultimoTicket)
        if (this.ultimos4.length > 4)
            this.ultimos4.pop()

        this.grabarArchivo()

        return ultimoTicket


    }

    grabarArchivo() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData))
    }

    reiniciarConteo() {
        this.tickets = []
        this.ultimo = 0
        this.ultimos4 = []
        this.grabarArchivo()
    }
}

module.exports = {
    TicketControl
}