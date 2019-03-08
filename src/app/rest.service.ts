import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Cacheable } from 'ngx-cacheable';


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
  constructor(private http: HttpClient) { }
  config = {color: 'primary'};
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  @Cacheable()
  getMetar(id): Observable<any> {
    return this.http.get(endpoint + 'metar/' + id + '?options=&format=json&onfail=cache').pipe( map(this.extractData));
  }
  @Cacheable()
  getTaf(id): Observable<any> {
    return this.http.get(endpoint + 'taf/' + id + '?options=&format=json&onfail=cache').pipe(
      map(this.extractData));
  }
  @Cacheable()
  getSigmet(): Observable<any> {
    console.log("Get sigmet");
    return this.http.get('https://api.met.no/weatherapi/sigmets/1.0/', {responseType: 'text'});
  }
  @Cacheable()
  getAerodromeInfo(id): Observable<any> {
    return this.http.get(endpoint + 'station/' + id + '?options=&format=json&onfail=cache').pipe(
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
