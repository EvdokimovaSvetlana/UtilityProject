import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todayYear = new Date().getFullYear();
    const year = [todayYear];
    const months = [
      { id: 1, name: 'January' },
      { id: 2, name: 'February' },
      { id: 3, name: 'March' },
      { id: 4, name: 'April' },
      { id: 5, name: 'May' },
      { id: 6, name: 'Juny' },
      { id: 7, name: 'July' },
      { id: 8, name: 'August' },
      { id: 9, name: 'September' },
      { id: 10, name: 'October' },
      { id: 11, name: 'November' },
      { id: 12, name: 'December' }
    ];
    const comunal = [
      {
        id: 0, idyear: 2018, idmonth: 3,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 180, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }, {
        id: 1, idyear: 2018, idmonth: 1,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 160, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }, {
        id: 2, idyear: 2018, idmonth: 2,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 170, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      },
      {
        id: 3, idyear: 2017, idmonth: 1,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 150, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }, {
        id: 4, idyear: 2017, idmonth: 10,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 140, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }, {
        id: 5, idyear: 2016, idmonth: 2,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 130, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      },
      {
        id: 6, idyear: 2015, idmonth: 3,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 120, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }, {
        id: 7, idyear: 2014, idmonth: 1,
        panel1: [{ id: 0, name: 'water', mustPay: 30, paid: 30, ind: 110, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }, {
        id: 8, idyear: 2013, idmonth: 2,
        panel1: [{ id: 0, name: 'water', mustPay: 3000, paid: 3000, ind: 100, price: 30, confirm: true }],
        panel2: [{ id: 1, name: 'apartment', mustPay: 50, paid: 50, confirm: true }]
      }
    ];
    const panel1 = [{ id: 0, name: 'water', mustPay: null, paid: null, ind: null, price: 30, confirm: false }];
    const panel2 = [{ id: 0, name: 'apartment', mustPay: 50, paid: null, confirm: false }];
    const mockInfoForPanel1 = [{ id: 0, name: 'gas', price: 50 },
    { id: 1, name: 'electric', price: 50 },
    { id: 2, name: 'heating', price: 50 }];
    const mockInfoForPanel2 = [{ id: 0, name: 'garbage', mustPay: 50 },
    { id: 1, name: 'elevator', mustPay: 50 },
    { id: 2, name: 'phone', mustPay: 50 },
    { id: 3, name: 'internet', mustPay: 50 },
    { id: 4, name: 'TV', mustPay: 50 }];

    return { months, comunal, panel1, panel2, mockInfoForPanel1, mockInfoForPanel2, year };
  }
}
