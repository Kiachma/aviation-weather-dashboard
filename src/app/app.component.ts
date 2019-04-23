import { Component } from '@angular/core';
import { AirportsService } from './airports.service';
import { RestService } from './rest.service';
import { MatIconRegistry } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public airportService: AirportsService, public rest: RestService,public matIconRegistry: MatIconRegistry,private activatedRoute: ActivatedRoute) {
    matIconRegistry.registerFontClassAlias ('fa');
  }
  title = 'Weather';

  getColor() {
    return this.rest.config.color;
  }
}
