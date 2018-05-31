import { Component, OnInit } from '@angular/core';
import { Month } from '../month';
import { MonthService } from '../month.service';
import { ComunalService } from '../comunal.service';
import { Comunal } from '../comunal';
import { Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  selectedMonth: Month;
  months: Month[];

  allComunals: Comunal[];
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private comunalService: ComunalService, private monthService: MonthService) {
    this.selectedMonth = { id: 0, name: "" };
  }

  getMonths(): void {
    this.monthService.getMonths().subscribe(months => this.months = months);
  }

  ngOnInit() {
    this.getMonths();
    this.getComunals();
    this.getFromSession(0);
    if (this.data[0] == undefined) {
      this.getYear();
    } else {
      this.chooseYear = this.data[0];
    }
  }


  todayMonth = new Date().getMonth();
  todayYear = new Date().getFullYear();
  chooseYear: number;

  public data: any = [];
  onSelect(month: Month): void {
    this.selectedMonth = month;
  }

  getYear() {
    this.monthService.getYear().subscribe(year => this.chooseYear = year[0]);
  }


  saveInSession(id, year): void {
    this.storage.set(id, year);
    this.data[id] = this.storage.get(id);
  }

  getFromSession(id): void {
    this.data[id] = this.storage.get(id);
  }

  getComunals() {
    this.comunalService.getComunals().subscribe(comunals => this.allComunals = comunals);
  }

  addingMustPay(month: number, year: number) {
    var sum: number = 0;
    let comunal: Comunal;
    for (var i = 0; i < this.allComunals.length; i++) {
      if ((this.allComunals[i].idmonth == month) && (this.allComunals[i].idyear == year)) {
        comunal = this.allComunals[i];
      }
    }
    if (comunal != undefined) {
      for (var i = 0; i < comunal.panel1.length; i++) {
        sum += comunal.panel1[i].mustPay;
      }
      for (var i = 0; i < comunal.panel2.length; i++) {
        sum += comunal.panel2[i].mustPay;
      }
      return sum;
    } else return 0;
  }

  addingPaid(month: number, year: number) {
    var sum: number = 0;
    let comunal: Comunal;
    for (var i = 0; i < this.allComunals.length; i++) {
      if ((this.allComunals[i].idmonth == month) && (this.allComunals[i].idyear == year)) {
        comunal = this.allComunals[i];
      }
    }
    if (comunal != undefined) {
      for (var i = 0; i < comunal.panel1.length; i++) {
        sum += comunal.panel1[i].paid;
      }
      for (var i = 0; i < comunal.panel2.length; i++) {
        sum += comunal.panel2[i].paid;
      }
      return sum;
    } else return 0;
  }

  calculateMinimulYear() {
    let min = this.allComunals[0].idyear;
    for (var i = 0; i < this.allComunals.length; i++) {
      if (this.allComunals[i].idyear < min) {
        min = this.allComunals[i].idyear
      }
    }
    return min;
  }

  ngOnDestroy() {
    this.saveInSession(0, this.chooseYear);
  }
}
