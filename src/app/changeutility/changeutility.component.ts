import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Detail } from '../detail';
import { DetailAnotherType } from '../detail-another-type';
import { ComunalService } from '../comunal.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-changeutility',
  templateUrl: './changeutility.component.html',
  styleUrls: ['./changeutility.component.css']
})
export class ChangeutilityComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location,
    private comunalService: ComunalService,
    private utilityService: UtilityService) { }

  panel1: Detail[];
  panel2: DetailAnotherType[];

  getPanel1(): void {
    this.comunalService.getPanel1().subscribe(panel => this.panel1 = panel);
  }

  getPanel2(): void {
    this.comunalService.getPanel2().subscribe(panel => this.panel2 = panel);
  }
  ngOnInit() {
    this.getPanel1();
    this.getPanel2();
  }

  savePanel1(detail: Detail) {
    this.comunalService.updatePanel1(detail).subscribe();
  }

  savePanel2(detail: DetailAnotherType) {
    this.comunalService.updatePanel2(detail).subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
