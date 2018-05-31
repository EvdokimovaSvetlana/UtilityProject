import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunalComponent } from './comunal.component';

describe('ComunalComponent', () => {
  let component: ComunalComponent;
  let fixture: ComponentFixture<ComunalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
