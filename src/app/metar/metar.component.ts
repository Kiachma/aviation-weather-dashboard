import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
@Component({
  selector: 'app-metar',
  templateUrl: './metar.component.html',
  styleUrls: ['./metar.component.scss'],
  providers: [RestService]
})
export class MetarComponent implements OnInit {
  @Input() icao: any;
  metar = {};
  constructor(public rest: RestService) { }

  ngOnInit() {
    interval(30000)
      .pipe(
        startWith(0),
        switchMap(() =>this.rest.getMetar(this.icao))
      )
      .subscribe((data: {}) => {
      this.metar = data;
      if (this.icao === 'ENTO') {
        if (data['Flight-Rules'] !== 'VFR') {
          this.rest.config.color = 'warn';
        }
      }
    });
  }

}
