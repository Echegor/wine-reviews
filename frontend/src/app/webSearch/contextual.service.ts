import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../data/image';


const httpOptions = {
  headers: new HttpHeaders({
    'X-Mashape-Key': '8ileJ80WhdmshnqE256UDR6EbQM1p1R5SQDjsnqwiJCK5yi39n' ,
    'X-Mashape-Host': 'contextualwebsearch-websearch-v1.p.mashape.com' ,
  }),
  params: {}
};
@Injectable({
  providedIn: 'root'
})
export class ContextualService {
  private api_url =  'https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI';

  constructor(private http: HttpClient) { }

  getImage(searchQuery: string): Observable<Image>{
    return this.getImageKey(searchQuery, 1, false);
  }

  getImageKey(searchQuery: string, count: number, autoCorrect: boolean): Observable<Image>{
    httpOptions.params = new HttpParams().set(
      'count', count.toString()
    ).set(
      'autoCorrect' , autoCorrect.toString()
    ).set(
      'q', searchQuery
    );
    return this.http.get<Image>(this.api_url,httpOptions)
  }
}
