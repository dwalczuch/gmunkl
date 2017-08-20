import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  private baseURL: string = 'https://ionicapp-9edaa.firebaseio.com';

  constructor(public http: Http) {
    console.log('Hello FirebaseProvider Provider');
  }

  getWuensche(){
    return this.http.get(this.baseURL.concat('/wuensche.json'))
        .do(this.logResponse)
        .map(this.extractData)
        .catch(this.catchError)
  }

  private logResponse(res: Response){
    console.log(res);
  }
  private extractData(res: Response){
    return res.json();
  }
  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }
}
