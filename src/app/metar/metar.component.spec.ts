import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetarComponent } from './metar.component';

describe('MetarComponent', () => {
  let component: MetarComponent;
  let fixture: ComponentFixture<MetarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
