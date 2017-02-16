import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

  constructor(
    private _http: Http
  ) {
  }

  getData(url: string) {
    return this._http.get(url)
      .map(res => res.json());
  }

  postData(url: string, body: any) {
    return this._http.post(url, body)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error('Error in retrieving news: ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
