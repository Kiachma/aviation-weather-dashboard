import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.scss']
})
export class NotamComponent implements OnInit {

  @Input() icao: any;
  notams = {};
  constructor(public rest: RestService) { }

  ngOnInit() {
     interval(30000)
      .pipe(
        startWith(0),
        switchMap(() =>this.rest.getNotam(this.icao))
      )
      .subscribe((data: {}) => {
        if(data.hasOwnProperty('rows')){
          this.notams = data['rows'];
        }
      
    });
  }

}
