import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComunalService } from '../comunal.service';
import { UtilityService } from '../utility.service';
import { Detail } from '../detail';
import { DetailAnotherType } from '../detail-another-type';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location,
    private comunalService: ComunalService,
    private utilityService: UtilityService) { }

  openList: false;
  selectPanel1: Detail[];
  selectPanel2: DetailAnotherType[];

  ngOnInit() {
    this.getSelectPanel1();
    this.getSelectPanel2();
  }

  addPanel1(name: string, price: number) {
    const newPanel1 = { name: name, mustPay: null, paid: null, ind: null, price: price, confirm: false };
    this.comunalService.addPanel1((newPanel1) as Detail).subscribe();
  }

  addPanel2(name: string, price: number) {
    const newPanel2 = { name: name, mustPay: price, paid: null, confirm: false };
    this.comunalService.addPanel2((newPanel2) as DetailAnotherType).subscribe();
  }

  getSelectPanel1(): void {
    this.utilityService.getPanel1().subscribe(panel => this.selectPanel1 = panel);
  }

  getSelectPanel2(): void {
    this.utilityService.getPanel2().subscribe(panel => this.selectPanel2 = panel);
  }

  goBack(): void {
    this.location.back();
  }

}
