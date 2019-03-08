import { Component, OnInit , Input} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import AirportMapping from '../../assets/AirportMapping.json';
import { AirportsService } from '../airports.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, public airportService: AirportsService) {
    console.log('Reading local json files');
    console.log(AirportMapping);
  }
  breakpoint = null;
  cards = {};
  ngOnInit() {
    /** Based on the screen size, switch from standard to one column per row */
    this.onResize({target: {innerWidth: window.innerWidth}});
  }

  getImageUrl(airport) {
    return 'https://www.yr.no/sted/' + AirportMapping[airport].url + 'avansert_meteogram.png';
  }
  onResize(event) {
    if (event.target.innerWidth <= 800) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 1400) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }
}
