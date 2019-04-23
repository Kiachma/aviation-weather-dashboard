import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Cacheable } from 'ngx-cacheable';
import { NgxXml2jsonService } from 'ngx-xml2json';

const endpoint = 'https://avwx.rest/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient,private ngxXml2jsonService: NgxXml2jsonService) {
   }
  config = {color: 'primary'};
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  private parseXml(res: string){
    const body = res;
    const parser = new DOMParser();
    const xml = parser.parseFromString(body, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    return obj || { };
  }
  @Cacheable()
  getMetar(id): Observable<any> {
    return this.http.get(endpoint + 'metar/' + id + '?options=&format=json&onfail=cache').pipe( map(this.extractData));
  }
  @Cacheable()
  getTaf(id): Observable<any> {
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "-" +("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime.getDate()).slice(-2);
    return this.http.get('https://api.met.no/weatherapi/tafmetar/1.0/?icao='+id+'&content_type=text/xml&date='+formatted_date+'&content=tafmetar',{ responseType: 'text' }).pipe(
      map((res) => this.parseXml(res)));
    //return this.http.get(endpoint + 'taf/' + id + '?options=&format=json&onfail=cache').pipe(
      //map(this.extractData));
  }
  getSigmet(): Observable<any> {
    console.log("Get sigmet");
    return this.http.get('https://api.met.no/weatherapi/sigmets/1.0/', {responseType: 'text'}).pipe(
     );
  }
  @Cacheable()
  getAerodromeInfo(id): Observable<any> {
    return this.http.get(endpoint + 'station/' + id + '?options=&format=json&onfail=cache').pipe(
      map(this.extractData));
  }
  @Cacheable()
  getNotam(id): Observable<any> {
    return this.http.get(encodeURI('https://api.autorouter.aero/v1.0/notam?itemas=["'+id+'"]&offset=0&limit=100')).pipe(
    )
  }
  getSunInfo(lat,lng): Observable<any> {
    return this.http.get('https://api.sunrise-sunset.org/json?lat='+lat+'&lng='+lng+'&formatted=0').pipe(
      map(this.extractData));
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
  };
}

}
