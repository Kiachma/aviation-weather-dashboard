import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {
  constructor() { }
  airports = ['ENTO', 'ENNO','ENGK','ENCN'];
  visible = {
    sigmet: true,
    sigchart: true,
    radar: true,
    ceiling: true,
    visibility: true,
    airportCards:true,
    lightning: false
  };
}
