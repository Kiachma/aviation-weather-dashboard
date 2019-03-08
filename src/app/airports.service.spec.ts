import { TestBed } from '@angular/core/testing';

import { AirportsService } from './airports.service';

describe('AirportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirportsService = TestBed.get(AirportsService);
    expect(service).toBeTruthy();
  });
});
