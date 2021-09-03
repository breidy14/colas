const lblTicket1 = document.querySelector('#lblTicket1');
const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesktop4 = document.querySelector('#lblDesktop4');

const socket = io();

socket.on('last4', (payload) => {
  /*reproducir sonido al atender un ticket,
    chrome bloquea el audio, ya que no permite reproducir audio,
    al menos que la misma pantalla sea la que active el evento de reproducir,
    en firefox se puede saltar, dadole a permitir reproducción de audio en este dominio
  const audio = new Audio('../audio/new-ticket.mp3');
  audio.play(); */

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (ticket1) {
    lblTicket1.innerText = ticket1.number;
    lblDesktop1.innerText = ticket1.descktop;
  }
  if (ticket2) {
    lblTicket2.innerText = ticket2.number;
    lblDesktop2.innerText = ticket2.descktop;
  }
  if (ticket3) {
    lblTicket3.innerText = ticket3.number;
    lblDesktop3.innerText = ticket3.descktop;
  }

  if (ticket4) {
    lblTicket4.innerText = ticket4.number;
    lblDesktop4.innerText = ticket4.descktop;
  }
});
