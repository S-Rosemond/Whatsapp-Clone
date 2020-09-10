// using js to complete backend; purpose: learn
const io = require('socket.io')(5000);

io.on('connection', (socket) => {
  // allow: for static id on page refresh
  const id = socket.handshake.query.id;

  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      // remove current recipient from list of recipients
      const newRecipient = recipients.filter((r) => r !== recipient);

      newRecipient.push(id);

      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipient,
        sender: id,
        text,
      });
    });
  });
});
