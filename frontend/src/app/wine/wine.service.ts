import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Wine} from './wine';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private winesUrl = 'http://localhost:8080/wines';  // URL to web api

  constructor(private http:HttpClient) { }

  /** GET wines from the server */
  getWines (): Observable<Wine[]> {
    return this.http.get<Wine[]>(this.winesUrl)
      .pipe(
        tap(winees => this.log('fetched wines')),
        catchError(this.handleError('getWines', []))
      );
  }

  /** GET wine by id. Return `undefined` when id not found */
  getWineNo404<Data>(id: number): Observable<Wine> {
    const url = `${this.winesUrl}/${id}`;
    console.log(url);
    return this.http.get<Wine>(url)
      .pipe(
        tap(w => {
          const outcome = w ? `fetched` : `did not find`;
          this.log(`${w} ${outcome} wine id=${id}`);
        }),
        catchError(this.handleError<Wine>(`getWine id=${id}`))
      );
  }

  /* GET wines whose name contains search term */
  searchWines(term: string): Observable<Wine[]> {
    if (!term.trim()) {
      // if not search term, return empty wine array.
      return of([]);
    }
    return this.http.get<Wine[]>(`${this.winesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found winees matching "${term}"`)),
      catchError(this.handleError<Wine[]>('searchWines', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new wine to the server */
  addWine (wine: Wine): Observable<Wine> {
    return this.http.post<Wine>(this.winesUrl, wine, httpOptions).pipe(
      tap((wine: Wine) => this.log(`added wine w/ id=${wine.id}`)),
      catchError(this.handleError<Wine>('addWine'))
    );
  }

  /** DELETE: delete the wine from the server */
  deleteWine (wine: Wine | number): Observable<Wine> {
    const id = typeof wine === 'number' ? wine : wine.id;
    const url = `${this.winesUrl}/${id}`;

    return this.http.delete<Wine>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted wine id=${id}`)),
      catchError(this.handleError<Wine>('deleteWine'))
    );
  }

  /** PUT: update the wine on the server */
  updateWine (wine: Wine): Observable<any> {
    return this.http.put(this.winesUrl, wine, httpOptions).pipe(
      tap(_ => this.log(`updated wine id=${wine.id}`)),
      catchError(this.handleError<any>('updateWine'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a WineService message with the MessageService */
  private log(message: string) {
    console.log(`WineService: ${message}`);
  }
}
