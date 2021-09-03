const searchParams = new URLSearchParams(window.location.search);
const h1Descktop = document.querySelector('#h1Descktop');
const btnAttend = document.querySelector('#btnAttend');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendings = document.querySelector('#lblPendings');

if (!searchParams.has('descktop')) {
  window.location = 'index.html';
  throw new Error('El descktop es obligatorio');
}

const descktop = searchParams.get('descktop');
h1Descktop.innerText = descktop;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  btnAttend.disabled = false;
});

socket.on('disconnect', () => {
  btnAttend.disabled = true;
});

socket.on('ticket-pendings', (tickets) => {
  if (tickets === 0) {
    lblPendings.style.display = 'none';
  } else {
    lblPendings.style.display = '';
    lblPendings.innerText = tickets;
  }
});

btnAttend.addEventListener('click', () => {
  const payload = {
    descktop,
  };
  socket.emit('attend-ticket', payload, (resp) => {
    const { ok, ticket } = resp;

    if (!ok) {
      return (divAlert.style.display = '');
    }
    lblTicket.innerText = 'Ticket: ' + ticket.number;
  });
});
