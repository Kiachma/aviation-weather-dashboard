import { Component, OnInit , Input} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import AirportMapping from '../../assets/AirportMapping.json';
import { AirportsService } from '../airports.service';
import { DomSanitizer ,SafeUrl} from '@angular/platform-browser';
import { skip } from 'rxjs/operators';
import {Router, ActivatedRoute, Params,ParamMap} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, public airportService: AirportsService,private sanitizer: DomSanitizer,private activatedRoute: ActivatedRoute) {

  }
  breakpoint = null;
  cards = {};
  lat=59.153;
  lng=10.107;
  rowHeight = 170;
  windyCloudUrl: SafeUrl;
  windyCeilingUrl: SafeUrl;
  windyVisibilityUrl: SafeUrl;
  colspan=1;
  rowspan=5
  ngOnInit() {

    this.activatedRoute.queryParamMap.pipe(skip(1)).subscribe(
    (params: ParamMap) => this.setLatLng(params));
    
    /** Based on the screen size, switch from standard to one column per row */
    this.onResize({target: {innerWidth: window.innerWidth}});
    this.updateWindyUrls();
  }
  
  setLatLng(res){
        if(res.params['lat']){
          this.lat=res.params['lat']
        }else{
          this.lat=59.153;
        }
        if(res.params['lng']){
          this.lng=res.params['lng']
        }else{
          this.lng=10.107;
        }
        this.updateWindyUrls();
        this.onResize({target: {innerWidth: window.innerWidth}});
        console.log(this.lat)
        console.log(this.lng)
  }
  getImageUrl(airport) {
    return 'https://www.yr.no/sted/' + AirportMapping[airport].url + 'avansert_meteogram.png';
  }
  onResize(event) {
    if (event.target.innerWidth <= 400) {
      this.breakpoint = 2;
      this.colspan=2
      this.rowspan=3

    }else if (event.target.innerWidth <= 800) {
      this.colspan=2
      this.breakpoint = 4;
      this.rowspan=3
    } else if (event.target.innerWidth <= 1400) {
      this.colspan=1
      this.breakpoint = 4;
      this.rowspan=5
    }
     else {
      this.breakpoint = 6;
      this.colspan=1
      this.rowspan=5
    }
  }
  updateWindyUrls(){
    this.windyCloudUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://embed.windy.com/embed2.html?lat="+this.lat+"&lon="+this.lng+"&zoom=5&level=surface&overlay=clouds&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=59.131&detailLon=10.217&metricWind=default&metricTemp=default&radarRange=-1");
    this.windyCeilingUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://embed.windy.com/embed2.html?lat="+this.lat+"&lon="+this.lng+"&zoom=5&level=surface&overlay=cbase&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=59.131&detailLon=10.217&metricWind=default&metricTemp=default&radarRange=-1");
    this.windyVisibilityUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://embed.windy.com/embed2.html?lat="+this.lat+"&lon="+this.lng+"&zoom=5&level=surface&overlay=visibility&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=59.131&detailLon=10.217&metricWind=default&metricTemp=default&radarRange=-1");
  }
}