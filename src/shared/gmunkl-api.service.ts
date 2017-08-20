import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GmunklApi {
  private aktuellerWunsch: any = {};
  private baseURL = 'https://ionicapp-9edaa.firebaseio.com';
  private apiURL = 'http://localhost:8000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http){
  }

//-----------------WUNSCH-FUNKTIONEN---------------------//

  getWuensche(){
    let url = this.apiURL.concat("/wuensche");
    return this.http
             .get(url, this.options)
             .map(res => res.json().wuensche);
  }

  getWunsches(){
    let url = this.apiURL.concat("/wuensche");
    return new Promise(resolve =>{
      this.http.get(url, this.options)
          .subscribe(res => resolve(res.json().wuensche));
    });
  }

  addWunsch(wunsch, author, position): Observable<any> {
     let url = this.apiURL.concat('/wuensche');
     let obj = { "text": wunsch, "author": author, "lat": position.latitude, "long": position.longitude};
     console.log(obj);
     return this.http.post(url, obj, this.options)
                   .map(res => res.json().wunsch)
                   .catch(this.handleErrorObservable);
  }

  wunschGemeldet(wunsch){
    let url = this.apiURL.concat('/wuensche/'.concat(wunsch.id));
    wunsch.gemeldet += 1;
    return this.http
               .put(url, JSON.stringify(wunsch), this.options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);
  }

  deleteWunsch(wunsch){
    let url = this.apiURL.concat('/wuensche/'.concat(wunsch.id));
    console.log(wunsch);
    console.log('Wunsch gelöscht!');
    return this.http.delete(url, this.options)
              .map(this.extractData)
              .catch(this.handleErrorObservable)
  }

//---------------------KOMMENTAR-FUNKTIONEN-----------------------------------//

  getKommentare(){
    let url = this.apiURL.concat('/kommentare');
    return this.http
             .get(url, this.options)
             .map(res => res.json().kommentare)
             .catch(this.handleErrorObservable);
  }

  addKommentar(author, text, wunsch_id): Observable<any> {
     let url = this.apiURL.concat('/kommentare');
	   let obj = {"author": author, "text": text, "wunsch_id": wunsch_id};
     return this.http.post(url, obj, this.options)
                   .map(res => res.json().kommentar)
                   .catch(this.handleErrorObservable);
  }

  deleteKommentar(kommentar){
    let url = this.apiURL.concat('/kommentare/'.concat(kommentar.id));
    console.log(kommentar);
    console.log('kommentar gelöscht!');
    return this.http.delete(url, this.options)
              .map(this.extractData)
              .catch(this.handleErrorObservable)
  }

  kommentarGemeldet(kommentar){
    let url = this.apiURL.concat('/kommentare/'.concat(kommentar.id));
    kommentar.gemeldet += 1;

      return this.http
               .put(url, JSON.stringify(kommentar), this.options)
               .map(this.extractData)
               .catch(this.handleErrorObservable);

  }

//--------------------ORGANISATIONEN-FUNKTIONEN-------------------------

  getOrganisationen(){
    let url = this.apiURL.concat('/organisationen');
    return this.http
             .get(url, this.options)
             .map(res => res.json().organisationen)
             .catch(this.handleErrorObservable);
  }


//-----------------------------------------------------------------------


    private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }

  private extractData(res: Response) {
	let body = res.json();
        return body.data || {};
    }

  private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }

  setAktuellerWunsch(wunsch){
      this.aktuellerWunsch = wunsch;
  }
  getAktuellerWunsch(){
      return this.aktuellerWunsch;
  }
}
