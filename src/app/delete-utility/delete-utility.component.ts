import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComunalService } from '../comunal.service';
import { UtilityService } from '../utility.service';
import { Detail } from '../detail';
import { DetailAnotherType } from '../detail-another-type';

@Component({
  selector: 'app-delete-utility',
  templateUrl: './delete-utility.component.html',
  styleUrls: ['./delete-utility.component.css']
})
export class DeleteUtilityComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location,
    private comunalService: ComunalService,
    private utilityService: UtilityService) { }

  panel1: Detail[];
  panel2: DetailAnotherType[];

  ngOnInit() {
    this.getPanel1();
    this.getPanel2();
  }

  getPanel1(): void {
    this.comunalService.getPanel1().subscribe(panel => this.panel1 = panel);
  }

  getPanel2(): void {
    this.comunalService.getPanel2().subscribe(panel => this.panel2 = panel);
  }

  deletePanel1(item: Detail) {
    const detail = this.panel1.filter(d => d !== item);
    this.comunalService.deletePanel1(item).subscribe();
    this.getPanel1();
  }

  deletePanel2(item: DetailAnotherType) {
    const detail = this.panel1.filter(d => d !== item);
    this.comunalService.deletePanel2(item).subscribe();
    this.getPanel2();
  }

  goBack(): void {
    this.location.back();
  }
}
