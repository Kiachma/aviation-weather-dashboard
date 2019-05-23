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
    this.rest.getNotam(this.icao).subscribe((data: {}) => {
      this.notams =data;
    });
  }

}
