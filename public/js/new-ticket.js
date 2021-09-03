const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCrear = document.querySelector('#btnCrear');

const socket = io();

socket.on('connect', () => {
  btnCrear.disabled = false;
});

socket.on('disconnect', () => {
  btnCrear.disabled = true;
});

socket.on('last-ticket', (last) => {
  lblNewTicket.innerText = last;
});

btnCrear.addEventListener('click', () => {
  const payload = {
    id: '123ABC',
    date: new Date().getTime(),
  };
  socket.emit('next-ticket', payload, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
