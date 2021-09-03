const path = require('path');
const fs = require('fs');

class Ticket {
  constructor(num, descktop) {
    this.number = num;
    this.descktop = descktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    };
  }

  init() {
    const { today, last, last4, tickets } = require('../db/data.json');

    if (today === this.today) {
      //si es el mismo día cargar los datos
      this.last = last;
      this.last4 = last4;
      this.tickets = tickets;
    } else {
      // es otro día, inicializar desde cero
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDB();
    return 'Ticket: ' + ticket.number;
  }

  attendTicket(descktop) {
    //no tenemos tickets
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift(); // remover ultimo ticket y retonarlo
    ticket.descktop = descktop;

    this.last4.unshift(ticket); // agregar ticket al pricipio

    if (this.last4.length === 5) {
      this.last4.splice(-1, 1);
    }
    this.saveDB();
    return ticket;
  }
}
module.exports = TicketControl;
