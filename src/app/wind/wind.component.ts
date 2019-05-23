import { Component, OnInit, Input  } from '@angular/core';
import { RestService } from '../rest.service';
import * as angles from 'angles';
import AirportMapping from '../../assets/AirportMapping.json';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {

  metar = {raw:null,
    wind_speed:null,
    wind_direction:null,
    temp:null,
    QNH:null

  };
  info = {};
  @Input() icao: string;

  constructor(public rest: RestService) { }

  ngOnInit() {
    angles.SCALE = 360;
    this.getMetar();
    this.getAerodromeInfo();
  }
  getMetar() {
    this.rest.getTaf(this.icao).subscribe((data: {}) => {
      var myRegexp = /(\d{3}|VRB)[0-9A-Z]+KT/;
      let metars = data['metno:aviationProducts']['metno:meteorologicalAerodromeReport'];
      this.metar.raw = metars[metars.length-1]['metno:metarText'];
      this.metar.wind_direction= myRegexp.exec(this.metar.raw)?myRegexp.exec(this.metar.raw)[1]:"";
      myRegexp = /(\d{2})KT/;
      this.metar.wind_speed=myRegexp.exec(this.metar.raw)?myRegexp.exec(this.metar.raw)[1]:"";
      myRegexp = /(\d+)\/M?\d+/;
      this.metar.temp=myRegexp.exec(this.metar.raw)?myRegexp.exec(this.metar.raw)[1]:"";
      myRegexp =  /[AQ](\d{4})/;
      this.metar.QNH= myRegexp.exec(this.metar.raw)?myRegexp.exec(this.metar.raw)[1]:"";
      
    });
  }
  getAerodromeInfo() {
    this.rest.getAerodromeInfo(this.icao).subscribe((data: {}) => {
      this.info = data;
      if (!this.info.hasOwnProperty('runways')){
        this.info = {
          runways:[
            {
              ident1:AirportMapping[this.icao].rwyDeg[0],
              ident2:AirportMapping[this.icao].rwyDeg[1]
            }
          ]
        };
      }
    });
  }
  getCrosswind(rwy) {
    if( this.metar.hasOwnProperty('wind_speed')){

      const speed = this.metar['wind_speed'];

      const angularDifference = Math.min(this.getAngularDifference(rwy.ident1), this.getAngularDifference(rwy.ident2));
      return Math.ceil(speed * Math.sin(angularDifference));
    }

  }
  getAngularDifference(rwyDirection) {
    let direction = this.metar['wind_direction'];
    if (direction === 'VRB') {
      return 90* Math.PI / 180;
    } else {
      direction = angles.normalize(direction);
    }
    let diff = angles.diff(angles.normalize(parseInt(rwyDirection.replace(/[^0-9]/, '') + 0)) , direction);
    if(diff>180){
      diff=360-diff;
    }
    return Math.abs(diff)* Math.PI / 180;

  }
  getHeadwind(rwy) {
    if( this.metar.hasOwnProperty('wind_speed')){
      const speed = this.metar['wind_speed'];
      const angularDifference = this.getAngularDifference(this.getRwyInUse(rwy));
      return Math.floor(speed * Math.cos(angularDifference));
    }
    return null;

  }
  getRwyInUse(rwy){
    if( this.metar.hasOwnProperty('wind_speed')){
      if (Math.abs(this.getAngularDifference(rwy.ident1)) > Math.abs(this.getAngularDifference(rwy.ident2))) {
        return rwy.ident2;
      } else{
        return rwy.ident1;
      }
    }
  }
}
