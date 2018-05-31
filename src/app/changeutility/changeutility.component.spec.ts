import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeutilityComponent } from './changeutility.component';

describe('ChangeutilityComponent', () => {
  let component: ChangeutilityComponent;
  let fixture: ComponentFixture<ChangeutilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeutilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeutilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
