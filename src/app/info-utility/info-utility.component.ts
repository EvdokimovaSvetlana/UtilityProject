import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Detail } from '../detail';
import { Comunal } from '../comunal';
import { DetailAnotherType } from '../detail-another-type';
import { ComunalService } from '../comunal.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-info-utility',
  templateUrl: './info-utility.component.html',
  styleUrls: ['./info-utility.component.css']
})
export class InfoUtilityComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location,
    private comunalService: ComunalService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.getComunals();
    this.getPanel1();
    this.getPanel2();
  }

  allComunals: Comunal[];
  findComunal1: Comunal[] = [];
  findComunal2: Comunal[] = [];
  panel1: Detail[];
  panel2: DetailAnotherType[];

  getPanel1(): void {
    this.comunalService.getPanel1().subscribe(panel => this.panel1 = panel);
  }

  getPanel2(): void {
    this.comunalService.getPanel2().subscribe(panel => this.panel2 = panel);
  }

  getComunals() {
    this.comunalService.getComunals().subscribe(comunals => this.allComunals = comunals);
  }

  infoWith(item: Detail) {
    for (var i = 0; i < this.allComunals.length; i++) {
      for (var j = 0; j < this.allComunals[i].panel1.length; j++) {
        if ((this.allComunals[i].panel1[j].name == item.name) && (this.allComunals[i].panel1[j].confirm == true)) {
          let comunal: Comunal = { id: this.allComunals[i].id, idmonth: this.allComunals[i].idmonth, idyear: this.allComunals[i].idyear, panel1: [], panel2: [] };
          comunal.panel1.push(this.allComunals[i].panel1[j])
          this.findComunal1.push(comunal);
        }
      }
    }
  }

  infoWithout(item: DetailAnotherType) {
    for (var i = 0; i < this.allComunals.length; i++) {
      for (var j = 0; j < this.allComunals[i].panel2.length; j++) {
        if ((this.allComunals[i].panel2[j].name == item.name) && (this.allComunals[i].panel2[j].confirm == true)) {
          let comunal: Comunal = { id: this.allComunals[i].id, idmonth: this.allComunals[i].idmonth, idyear: this.allComunals[i].idyear, panel1: [], panel2: [] };
          comunal.panel2.push(this.allComunals[i].panel2[j])
          this.findComunal2.push(comunal);
        }
      }
    }
  }


  goBack(): void {
    this.location.back();
  }
}
