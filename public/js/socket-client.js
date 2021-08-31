const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');
//const textArea = document.querySelector('#textArea');

const socket = io();

socket.on('connect', () => {
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
  console.log(payload);
  //textArea.value = textArea.value + '\n' + payload.message;
});

btnSend.addEventListener('click', () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: '123ABC',
    date: new Date().getTime(),
  };
  socket.emit('send-message', payload, (id) => {
    console.log('desde el server', id);
  });
});
