import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUtilityComponent } from './info-utility.component';

describe('InfoUtilityComponent', () => {
  let component: InfoUtilityComponent;
  let fixture: ComponentFixture<InfoUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
