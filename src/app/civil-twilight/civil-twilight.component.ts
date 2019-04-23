import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import moment from 'moment';
@Component({
  selector: 'app-civil-twilight',
  templateUrl: './civil-twilight.component.html',
  styleUrls: ['./civil-twilight.component.scss']
})
export class CivilTwilightComponent implements OnInit {

  constructor(public rest: RestService) { }
  @Input() icao: any;
  sun = {};
  moment = moment;
  info = null
  ngOnInit() {
    this.getAerodromeInfo();
  }
  getSunInfo(airport) {
    this.rest.getSunInfo(airport.latitude, airport.longitude).subscribe((data: {}) => {
      this.sun = data['results'];
    });
  }
  getAerodromeInfo() {
    this.rest.getAerodromeInfo(this.icao).subscribe((data: {}) => {
      this.info =data;
      this.getSunInfo(data);
    });
  }

  getSunrise(){
    if(this.sun['civil_twilight_begin']){
      return this.moment(this.sun['civil_twilight_begin']).format("HH:mm");
    }
    return null;
    
  }
  getSunset(){
    if(this.sun['civil_twilight_end']){
      return this.moment(this.sun['civil_twilight_end']).format("HH:mm");
    }
    return null;
    
  }

}
