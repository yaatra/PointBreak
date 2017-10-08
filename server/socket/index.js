module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message)
    })

    // socket.on('new message', function(msg) {
    //   socket.broadcast.to(msg.eventID).emit('new bc message', msg);
    // })
  })
}
