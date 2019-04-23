import { Component, OnInit, NgZone, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { LatLng, tileLayer, circle, polygon, control } from 'leaflet';
import moment from 'moment';
import {Map } from 'leaflet';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
@Component({
  selector: 'app-sigmet',
  templateUrl: './sigmet.component.html',
  styleUrls: ['./sigmet.component.scss']
})
export class SigmetComponent implements OnInit {
  constructor(public rest: RestService,private zone: NgZone) {

  }
  @Input() lat: number 
  @Input() lng: number 

  re = /([A-Z]{4}) (AIRMET|SIGMET|WS WRNG) (\w{1,3})\s?\d{0,6}\s?VALID (\d{6}\/\d{6}) [\s\S]*?(.+?)(?:(\w\d{4} \w\d{5}(?: - )?)*)= NNNN/gm;
  positionRe = /(\w\d{4}) (\w\d{5})/gm
  raw  = null;
  leafletMap: Map;
  sigmets = [];
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  options = {
    layers: [this.streetMaps],
    zoom: 5,
    center:new LatLng(59.1923975,9.9688713 )
    
  };  

    zoom : number;
    center : LatLng;
  
  onMapReady(map: Map) {
    // assing map to a variable that we can manipulate
    this.leafletMap = map;
    
    setTimeout(function(){

        map.invalidateSize();        
     }, 1000);

 }
  ngOnInit() {
    this.center = new LatLng(this.lat,this.lng);

    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() =>this.rest.getSigmet())
      )
      .subscribe((data: {}) => this.getSigmet(data));
  }
  getSigmet(data) {
   
      this.raw = data.replace(/^\s*\n/gm, ' ');
      this.raw = data.replace(/\s\s+/g, ' ');
      var matches = [];
      var output = [];
      for (var i = 0; i < this.sigmets.length; i++) {
        this.leafletMap.removeLayer(this.sigmets[i]);
      }
      this.sigmets = [];
      while (matches = this.re.exec(this.raw)) {
        const sigmet = {
          location: matches[1],
          identifier: matches[2],
          sequence: matches[3],
          startTime: this.parseValidTime(matches[4].split('/')[0]),
          endTime: this.parseValidTime(matches[4].split('/')[1]),
          message: matches[5],
          positions: [],
          full: matches[0]
         };

        matches = [];
        output = [];
        while (matches = this.positionRe.exec(sigmet.message)) {
          const position = [
            this.parseLat(matches[1]),
            this.parseLong(matches[2])
          ];
          if (position[0] != null && position[1] != null) {
             sigmet['positions'].push(position);
          }
        }
        let sigmetPoly =  polygon(sigmet.positions).bindPopup(sigmet.full);
       
        if(sigmet.identifier === 'AIRMET') {
          if (moment().isBefore(sigmet.startTime)) {
             sigmetPoly.setStyle({fillColor: '#1565C0'});
          }
          sigmetPoly.setStyle({color: '#1565C0'});

        } else if (sigmet.identifier === 'SIGMET') {
          if (moment().isBefore(sigmet.startTime)) {
            sigmetPoly.setStyle({fillColor: '#E53935'});
          }
          sigmetPoly.setStyle({color: '#E53935'});
        }
        if (moment().isBefore(sigmet.endTime)) {
          this.sigmets.push(sigmetPoly);
          this.leafletMap.addLayer(sigmetPoly);
          let tooltip = sigmetPoly.bindTooltip(sigmet.sequence,
           {permanent: true, direction:"center"}
          )

          tooltip.openTooltip();
          //this.layersControl.overlays[sigmet.identifier + ' ' + sigmet.sequence] = sigmetPoly;
        }

      }
  }
  parseLat(lat) {

    if (lat.startsWith('N')) {
      return parseInt(lat.substring(1)) / 100;
    } else {
       return - parseInt(lat.substring(1)) / 100;
    }
  }
  parseLong(long){

    if (long.startsWith('E')) {
      return parseInt(long.substring(1)) / 100;
    } else {
       return - parseInt(long.substring(1)) / 100;
    }
  }
  parseValidTime(end) {
    return moment(end + 'Z', 'DDHHmmZ');
  }
}