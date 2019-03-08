import { Component } from '@angular/core';
import { AirportsService } from './airports.service';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public airportService: AirportsService, public rest: RestService) {}
  title = 'Weather';

  getColor() {
    return this.rest.config.color;
  }
}
