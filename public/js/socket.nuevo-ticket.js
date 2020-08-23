const socket = io()

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault()

    socket.emit('nuevoTicket')
})

/**Verificando Conexión */
socket.on('connect', () => {

        console.log('Conectado al Servidor')
    })
    /**Verificando Desconexión */
socket.on('disconnect', () => {
    console.log('Desconectado del Servidor')
})

socket.on('nuevoTicket', (ticket) => {
    document.querySelector('#lblNuevoTicket').innerHTML = ticket
})