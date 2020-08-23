const socket = io()

socket.on('connect', () => {
    console.log('Conectado al servidor')
})
socket.on('disconnect', () => {
    console.log('Desconectado del servidor')
})
socket.on('visorTicket', (tickets) => {
    console.log(tickets);
    tickets.forEach((value, index) => {
        document.querySelector(`#lblTicket${index+1}`).textContent = `Ticket: ${value.numero}`
        document.querySelector(`#lblEscritorio${index+1}`).textContent = `Escritorio: ${value.escritorio}`
    })
})