import { Component, OnInit, Input  } from '@angular/core';
import { RestService } from '../rest.service';

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
    this.getTaf();
  }
  getTaf() {
    this.rest.getTaf(this.icao).subscribe((data: {}) => {
      this.taf = data;
    });
  }
}
