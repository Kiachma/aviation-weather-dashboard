import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigmetComponent } from './sigmet.component';

describe('SigmetComponent', () => {
  let component: SigmetComponent;
  let fixture: ComponentFixture<SigmetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigmetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
