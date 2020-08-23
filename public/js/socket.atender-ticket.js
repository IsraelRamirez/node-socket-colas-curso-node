const socket = io()

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault()
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    socket.emit('atenderTicket', urlParams.get('escritorio'))
})

socket.on('connect', () => {
    console.log('Conectado al servidor')
})
socket.on('disconnect', () => {
    console.log('Desconectado del servidor')
})

socket.on('hayMasTickets', (msg) => {
    if (document.querySelector('small').textContent === "No hay tickets")
        document.querySelector('small').textContent = msg
})

socket.on('atenderTicket', (ticket) => {
    if (ticket && ticket.numero)
        document.querySelector('small').textContent = ticket.numero
    else
        document.querySelector('small').textContent = ticket
})