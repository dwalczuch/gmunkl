import { Injectable } from '@angular/core';
import { GmunklApi } from './shared';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class Location {
    constructor(private gmunklApi: GmunklApi, private http: Http, private geolocation: Geolocation){
  }
  wuensche: any;
  pos: any;
  organisationen = [];
  longs = [];
  lats = [];

  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.pos = resp.coords;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



  checkLocation(wuensche, pos){
    let long1 = pos.longitude;
    var lat1 = pos.latitude;
    let dx;
    let dy;
    let distance;
    let neueWuensche = [];
    console.log(wuensche);
    if(!wuensche){console.log('NO VALUE')}

    for(var i=0; i<wuensche.length; i++){
      dx = 71.5 * (long1 - wuensche[i].long);
      dy = 111.3 * (lat1 - wuensche[i].lat);
      distance = Math.sqrt(dx * dx + dy * dy);
      console.log(wuensche[i].text);
      console.log(distance);

      if(distance < 50){
        neueWuensche.push(wuensche[i]);
        console.log('Jawoll!');
        console.log(wuensche[i].text);
      }

    }
    return neueWuensche;
  }

  getLat(orga){
    this.getOrgaLocation(orga.strasse, orga.hausnummer, orga.plz, orga.stadt).subscribe(data =>{
      return data.lat;
    });
  }

  getLng(orga){
    this.getOrgaLocation(orga.strasse, orga.hausnummer, orga.plz, orga.stadt).subscribe(data =>{
      return data.lng;
    });
  }
  test(){return false;}

  checkOrgaLocation(lat, long){
        let long1 = this.pos.longitude;
        let lat1 = this.pos.latitude;
        let dx = 71.5 * (long1 - long);
        let dy = 111.3 * (lat1 - lat);
        let distance = Math.sqrt(dx * dx + dy * dy);
          //console.log(lat);
          //console.log(long);
          console.log('distance');
          console.log(distance);

          if(distance < 50){
            //console.log(orga);
            console.log('Jawoll!');
            return true;
          }else{
            return false;
          }
  }

  getOrgaLocation(strasse, nummer, plz, stadt){
    let long1 = this.pos.longitude;
    var lat1 = this.pos.latitude;
    let baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    let apiKey = "&key=AIzaSyCiJ7nrUMPYX_5p1D2dbRDUlkhJuC5hL4c";
    let x = strasse.concat("+".concat(nummer.concat("+".concat(plz.concat("+".concat(stadt))))));
    let url = baseUrl.concat(x.concat(apiKey));
    let erg;
    return this.http.get(url)
                .map(res =>res.json().results[0].geometry.location);
    //return this.getPosFromAddress(url).then(data =>erg = data);
    //dat => {this.wuensche = this.location.checkLocation(this.position, dat)}


  }

}
