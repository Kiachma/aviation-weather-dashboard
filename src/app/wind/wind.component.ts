import { Component, OnInit, Input  } from '@angular/core';
import { RestService } from '../rest.service';
import * as angles from 'angles'
@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {

  metar = {};
  info = {};
  @Input() icao: string;

  constructor(public rest: RestService) { }

  ngOnInit() {
    angles.SCALE = 360;
    this.getMetar();
    this.getAerodromeInfo();
  }
  getMetar() {
    this.rest.getMetar(this.icao).subscribe((data: {}) => {
      this.metar = data;
    });
  }
  getAerodromeInfo() {
    this.rest.getAerodromeInfo(this.icao).subscribe((data: {}) => {
      this.info = data;
      console.log(data);
    });
  }
  getCrosswind(rwy) {

    const speed = this.metar['Wind-Speed'];

    const angularDifference = Math.min(this.getAngularDifference(rwy.ident1), this.getAngularDifference(rwy.ident2));
    return Math.ceil(speed * Math.sin(angularDifference));

  }
  getAngularDifference(rwyDirection) {
    let direction = this.metar['Wind-Direction'];
    if (direction === 'VRB') {
      return 90* Math.PI / 180;
    } else {
      direction = angles.normalize(direction);
    }
    const diff = angles.diff(angles.normalize(parseInt(rwyDirection.replace(/[^0-9]/, '') + 0)) , direction);
    return Math.abs(diff)* Math.PI / 180;

  }
  getHeadwind(rwy) {
    const speed = this.metar['Wind-Speed'];
    const angularDifference = this.getAngularDifference(this.getRwyInUse(rwy));
    return Math.floor(speed * Math.cos(angularDifference));

  }
  getRwyInUse(rwy){
    if (Math.abs(this.getAngularDifference(rwy.ident1)) > Math.abs(this.getAngularDifference(rwy.ident2))) {
      return rwy.ident2;
    } else{
      return rwy.ident1;
    }
  }
}
