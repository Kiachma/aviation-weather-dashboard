import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilTwilightComponent } from './civil-twilight.component';

describe('CivilTwilightComponent', () => {
  let component: CivilTwilightComponent;
  let fixture: ComponentFixture<CivilTwilightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CivilTwilightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilTwilightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
