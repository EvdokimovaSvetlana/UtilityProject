import { Component, OnInit, Input } from '@angular/core';
import { Comunal } from '../comunal';
import { ComunalService } from '../comunal.service';
import { MonthService } from '../month.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Detail } from '../detail';
import { DetailAnotherType } from '../detail-another-type';


@Component({
  selector: 'app-comunal',
  templateUrl: './comunal.component.html',
  styleUrls: ['./comunal.component.css']
})

export class ComunalComponent implements OnInit {

  comunal: Comunal[];
  comunals: Comunal[];
  opport: boolean = true;
  prevMonth: boolean = true;
  temporaryItem: Detail;
  panel1: Detail[];
  panel2: DetailAnotherType[];
  selectPanel1: Detail[];
  selectPanel2: DetailAnotherType[];
  todayYear: number = new Date().getFullYear();
  todayMonth: number = new Date().getMonth()
  constructor(
    private comunalService: ComunalService,
    private monthService: MonthService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  getComunal(): void {
    const idmonth = +this.route.snapshot.paramMap.get('idmonth');
    const idyear = +this.route.snapshot.paramMap.get('idyear');
    if (idyear != 0 && idmonth != 0) {
      this.comunalService.getComunal(idmonth, idyear)
        .subscribe(comunal => {
          this.comunal = comunal;
          if ((this.comunal.length == 0) || (this.comunal === undefined)) {
            if ((idyear == this.todayYear) && (idmonth >= this.todayMonth) && (idmonth - 2 <= this.todayMonth)) {
              this.add(idmonth, idyear);
              this.getComunal();
            } else {
              this.opport = false;
            }
          } else {
            if (this.comunal[0].panel1.length < this.panel1.length) {
              if ((idyear == this.todayYear) && (idmonth >= this.todayMonth) && (idmonth - 2 <= this.todayMonth)) {
                for (let i = this.comunal[0].panel1.length; i < this.panel1.length; i++) {
                  this.comunal[0].panel1.push(this.panel1[i]);
                }
                this.save(this.comunal[0]);
              }
              else {
                this.getComunal();
              }
            }
            if (this.comunal[0].panel2.length < this.panel2.length) {
              if ((idyear == this.todayYear) && (idmonth >= this.todayMonth) && (idmonth - 2 <= this.todayMonth)) {
                for (let i = this.comunal[0].panel2.length; i < this.panel2.length; i++) {
                  this.comunal[0].panel2.push(this.panel2[i]);
                }
                this.save(this.comunal[0]);
              }
              else {
                this.getComunal();
              }
            }
            if (this.comunal[0].panel1.length > this.panel1.length) {
              if ((idyear == this.todayYear) && ((idmonth - 2 == this.todayMonth) || (idmonth - 1 == this.todayMonth))) {
                for (let i = 0; i < this.comunal[0].panel1.length; i++) {
                  let count: number = 0;
                  for (let j = 0; j < this.panel1.length; j++) {
                    if (this.comunal[0].panel1[i].name == this.panel1[j].name) {
                      count++;
                    }
                  }
                  if (count == 0) {
                    this.comunal[0].panel1.splice(i, 1);
                  }

                  this.save(this.comunal[0]);
                }
              }
            }
            if (this.comunal[0].panel2.length > this.panel2.length) {
              if ((idyear == this.todayYear) && ((idmonth - 2 == this.todayMonth) || (idmonth - 1 == this.todayMonth))) {
                for (let i = 0; i < this.comunal[0].panel2.length; i++) {
                  let count: number = 0;
                  for (let j = 0; j < this.panel2.length; j++) {
                    if (this.comunal[0].panel2[i].name == this.panel2[j].name) {
                      count++;
                    }
                  }
                  if (count == 0) {
                    this.comunal[0].panel2.splice(i, 1);
                  }

                  this.save(this.comunal[0]);
                }
              }
            }
          }
        });
    }
  }

  getComunals(): void {
    this.comunalService.getComunals().subscribe(comunals => this.comunals = comunals);
  }

  getSelectPanel1(): void {
    this.monthService.getPanel1().subscribe(panel => this.selectPanel1 = panel);
  }

  getSelectPanel2(): void {
    this.monthService.getPanel2().subscribe(panel => this.selectPanel2 = panel);
  }

  getPanel1(): void {
    this.comunalService.getPanel1().subscribe(panel => this.panel1 = panel);
  }

  getPanel2(): void {
    this.comunalService.getPanel2().subscribe(panel => this.panel2 = panel);
  }

  addPanel1(name: string, price: number) {
    const newPanel1 = { name: name, mustPay: null, paid: null, ind: null, price: price, confirm: false };
    this.comunalService.addPanel1((newPanel1) as Detail).subscribe();
    this.ngOnInit();
  }

  addPanel2(name: string, price: number) {
    const newPanel2 = { name: name, mustPay: price, paid: null, confirm: false };
    this.comunalService.addPanel2((newPanel2) as DetailAnotherType).subscribe();
    this.ngOnInit();
  }

  ngOnInit() {
    this.getPanel1();
    this.getPanel2();
    this.getSelectPanel1();
    this.getSelectPanel2();
    this.getComunals();
    this.getComunal();
  }


  newComunal(year: number, month: number) {
    const oo = { idyear: year, idmonth: month, panel1: this.panel1, panel2: this.panel2 };
    return oo;
  }

  save(comunal: Comunal): void {
    this.comunalService.updateComunal(comunal).subscribe();
  }

  add(idmonth: number, idyear: number): void {
    const oo = this.newComunal(idyear, idmonth);
    this.comunalService.addComunal((oo) as Comunal)
      .subscribe(comunal => this.comunals.push(comunal));
  }

  addingMustPay() {
    let sum: number = 0;
    for (let i = 0; i < this.comunal[0].panel1.length; i++) {
      sum += this.comunal[0].panel1[i].mustPay;
    }
    for (let i = 0; i < this.comunal[0].panel2.length; i++) {
      sum += this.comunal[0].panel2[i].mustPay;
    }
    return sum;
  }

  addingPaid() {
    let sum: number = 0;
    for (let i = 0; i < this.comunal[0].panel1.length; i++) {
      sum += this.comunal[0].panel1[i].paid;
    }
    for (let i = 0; i < this.comunal[0].panel2.length; i++) {
      sum += this.comunal[0].panel2[i].paid;
    }
    return sum;
  }

  sort(comunals: Comunal[]): Comunal[] {
    comunals.sort((obj1, obj2) => {
      return obj1.idmonth - obj2.idmonth;
    });
    return comunals.sort((obj1, obj2) => {
      return obj1.idyear - obj2.idyear;
    });


  }
  findPrev(comunal: Comunal, item: Detail, iter: number): Detail | any {
    this.getComunals();
    this.comunals = this.sort(this.comunals);
    if ((this.comunals[this.comunals.length - iter].idmonth == comunal.idmonth - 1) || (this.comunals[this.comunals.length - iter].idmonth == comunal.idmonth + 11)) {
      for (let j = 0; j < this.comunals[this.comunals.length - iter].panel1.length; j++) {
        if (this.comunals[this.comunals.length - iter].panel1[j].name === item.name) {
          if (!this.comunals[this.comunals.length - iter].panel1[j].confirm) {
            let panel = this.findPrev(this.comunals[this.comunals.length - iter], item, iter + 1);
            this.comunals[this.comunals.length - iter].panel1[j].ind = panel.ind;
            this.comunals[this.comunals.length - iter].panel1[j].mustPay = 0;
            this.comunals[this.comunals.length - iter].panel1[j].paid = 0;
            this.comunals[this.comunals.length - iter].panel1[j].confirm = true;
            this.save(this.comunals[this.comunals.length - iter]);
            return this.comunals[this.comunals.length - iter].panel1[j];

          } else {
            return this.comunals[this.comunals.length - iter].panel1[j];
          }
        }
      }
      let random: Detail = { id: 0, name: item.name, mustPay: 0, paid: 0, ind: 0, price: 0, confirm: false };
      return random;
    } else {
      this.prevMonth = false;
      return;
    }
  }

  findMaxi(comunal: Comunal, item: Detail) {

    this.temporaryItem = item;
    let item2 = this.findPrev(comunal, item, 2);
    if (item2 != undefined) {
      for (let j = 0; j < comunal.panel1.length; j++) {
        if (comunal.panel1[j].name === item.name) {
          if (comunal.panel1[j].ind < item2.ind) {
            comunal.panel1[j].ind = item2.ind;
            comunal.panel1[j].mustPay = 0;
            this.save(comunal);
          } else {
            comunal.panel1[j].mustPay = comunal.panel1[j].price * (comunal.panel1[j].ind - item2.ind);
            this.save(comunal);
          }
        }
      }
    }
  }
  addEmpty(idmonth: number, idyear: number, comunal: Comunal, item: Detail) {
    const oo = this.newComunal(idyear, idmonth);
    this.comunalService.addComunal((oo) as Comunal)
      .subscribe(newcomunal => { this.comunals.push(newcomunal); this.findMaxi(comunal, item); });
  }
  goBack(): void {
    this.location.back();
  }

}
