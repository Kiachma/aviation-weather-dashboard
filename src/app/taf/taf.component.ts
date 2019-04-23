import { Component, OnInit, Input  } from '@angular/core';
import { RestService } from '../rest.service';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
@Component({
  selector: 'app-taf',
  templateUrl: './taf.component.html',
  styleUrls: ['./taf.component.scss'],
  providers: [RestService]
})
export class TafComponent implements OnInit {
  taf = {};
  @Input() icao: string;

  constructor(public rest: RestService) { }

  ngOnInit() {
     interval(30000)
      .pipe(
        startWith(0),
        switchMap(() =>this.rest.getTaf(this.icao))
      )
      .subscribe((data: {}) => {
      this.taf = data['metno:aviationProducts']['metno:terminalAerodromeForecast'];
      if (this.taf.hasOwnProperty('length')){
          this.taf = this.taf[this.taf['length']-1]
      }
    });
  }

}
