import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebService {
  constructor(private http: HttpClient) {
  }

  /**
   * This method creates headers and adds them into options, for further requests.
   */
  public createAuthorizationHeader() {
    const headers: HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return {headers: headers};
  }

  /**
   * This method performs a GET request to the API.
   * @param {string} url - a partial path to the API.
   * @return {Observable<any>}
   */
  get(url: string) {
    return this.http.get(url);
  }

  /**
   * This method performs a POST request to the APIs.
   * @param {string} url - a partial path to the API.
   * @param body
   * @return {Observable<any>}
   */
  post(url: string, body: any) {
    this.http.post(url, JSON.stringify(body)).subscribe(res => {
      console.log(res)
      return res;
    });
  }

  /**
   * This method performs a PUT request to the API.
   * @param {String} url - a partial path to the API.
   * @param body
   */
  put(url: string, body?: any) {
    this.http.put(url, JSON.stringify(body)).subscribe(res => {
      return res;
    });
  }

  /**
   * This method performs a DELETE request to the API.
   * @param {String} url - a partial path to the API.
   * @param body
   */
  delete(url: string, body?: any): any {
    const params = new HttpParams().set(body.key, body.value);
    this.http.delete(url, {params: params}).subscribe(res => {
      return res;
    });
  }
}

