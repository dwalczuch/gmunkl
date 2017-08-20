import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WunschDetailPage } from '../pages';
import { GmunklApi, Location } from '../../shared/shared';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-wuensche',
  templateUrl: 'wuensche.html',
})
export class WuenschePage {

  wuensche: any;
  name = localStorage.getItem('username').toString();
  position: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gmunklApi: GmunklApi, private location: Location, private alertCtrl: AlertController, private geolocation: Geolocation) {
    //localStorage.setItem('username', 'Dominik');
  }

  ionViewDidLoad() {
    //this.position = this.location.getCurrentPosition();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.position = resp.coords;
      this.getWuensche();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  getWuensche(){
    this.gmunklApi.getWunsches().then(dat => {this.wuensche = this.location.checkLocation(dat, this.position)});
  }

  neuerWunsch(){
      let prompt = this.alertCtrl.create({
        title: 'neuer Wunsch',
        message: "Hier kannst Du einen Wunsch deiner Wahl äußern",
        inputs: [
          {
            name: 'wunsch',
            placeholder: 'Wunsch'
          },
        ],
        buttons: [
          {
            text: 'ne doch nicht',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'wünschen',
            handler: data => {
              console.log('Accept clicked');
              if(this.position){


              this.gmunklApi.addWunsch(data.wunsch, this.name, this.position)
                            .subscribe( data =>{
                              this.wuensche.push(data);
                            });
              this.getWuensche();
              }
              else{
                console.log('noch keine Position');
              }
            }
          }
        ]
      });
      prompt.present();
  }


  showWunsch($event, wunsch){
    this.gmunklApi.setAktuellerWunsch(wunsch);
    this.navCtrl.push(WunschDetailPage, wunsch);
  }
}
