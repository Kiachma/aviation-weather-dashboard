import { Component, OnInit, Input  } from '@angular/core';
import { RestService } from '../rest.service';

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

    let angularDifference = Math.min(this.getAngularDifference(rwy.ident1),this.getAngularDifference(rwy.ident2));
    return Math.ceil(speed*Math.sin(angularDifference* Math.PI / 180));

  }
  getAngularDifference(rwyDirection){
    const direction = this.metar['Wind-Direction'];
    let diff = parseInt(rwyDirection+0)-direction;
    if (direction ==='VRB'){
      return 90;
    }
    if(diff<0){
      return diff+360
    }else if (diff>360){
      return diff-360
    } else {
      return diff;
    }
  }
  getHeadwind(rwy) {
    const direction = this.metar['Wind-Direction'];
    const speed = this.metar['Wind-Speed'];
    let angularDifference = Math.min(this.getAngularDifference(rwy.ident1),this.getAngularDifference(rwy.ident2));
    return Math.floor(speed*Math.cos(angularDifference* Math.PI / 180));

  }
  getRwyInUse(rwy){
    const direction = this.metar['Wind-Direction'];

    if(this.getAngularDifference(rwy.ident1)>this.getAngularDifference(rwy.ident2)){
      return rwy.ident2
    }else{
      return rwy.ident1
    }
  }
}

