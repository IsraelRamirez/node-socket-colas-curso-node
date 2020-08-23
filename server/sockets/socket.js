const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {
    client.emit('visorTicket', ticketControl.getUltimos4())
    client.emit('nuevoTicket', ticketControl.getUltimo())
    client.on('nuevoTicket', () => {
        const ticket = ticketControl.siguiente()
        client.broadcast.emit('hayMasTickets', 'Hay más tickets')
        client.emit('nuevoTicket', ticket)

    })
    client.on('atenderTicket', escritorio => {

        client.emit('atenderTicket', ticketControl.atenderTicket(escritorio))
        client.broadcast.emit('visorTicket', ticketControl.getUltimos4())

    })

});