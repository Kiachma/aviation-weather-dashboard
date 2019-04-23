import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {
  constructor() { }
  airports = ['ENTO', 'ENCN','ENRY','ENNO','ENGK',];
  visible = {
    sigmet: true,
    sigchart: true,
    radar: true,
    ceiling: false,
    visibility: false,
    airportCards:true,
    lightning: false,
    clouds:true
  };
}
