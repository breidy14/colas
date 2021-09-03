const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  //al conectar nuevo cliente
  socket.emit('last-ticket', `Ticket: ${ticketControl.last}`);
  socket.emit('last4', ticketControl.last4);
  socket.emit('ticket-pendings', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    socket.broadcast.emit('ticket-pendings', ticketControl.tickets.length);
  });

  socket.on('ticket-pendings', () => {
    socket.broadcast.emit('ticket-pendings', ticketControl.tickets.length);
  });

  socket.on('attend-ticket', (payload, callback) => {
    const { descktop } = payload;
    if (!descktop) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio',
      });
    }

    const ticket = ticketControl.attendTicket(descktop);

    //cambio en los ultimos 4
    socket.broadcast.emit('last4', ticketControl.last4);

    //cola de pendientes
    socket.emit('ticket-pendings', ticketControl.tickets.length);
    socket.broadcast.emit('ticket-pendings', ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'Ya no hay tickets',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
