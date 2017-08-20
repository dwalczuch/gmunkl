import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GmunklApi } from '../../shared/shared';
import { AlertController } from 'ionic-angular';
import * as myGlobals from '../global';


/**
 * Generated class for the WunschDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wunsch-detail',
  templateUrl: 'wunsch-detail.html',
})
export class WunschDetailPage {
  alleKommentare = [];
  kommentare = [];
  meldungen = [];
  wunsch: any;
  uhrzeit: string;
  favorit: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gmunklApi: GmunklApi, private alertCtrl: AlertController) {
    this.wunsch = this.navParams.data;
  }

  ionViewDidLoad() {
    this.gmunklApi.getKommentare().subscribe(data => {
      if(data != null){
          this.alleKommentare = data;
      }
    });
    this.favorit = this.isFavorite();
  }

  ionViewWillLeave(){
    this.navCtrl.popToRoot();
  }

  ionViewDidEnter(){
    this.checkKommentare();
    this.uhrzeit = this.wunsch.created_at.substring(11,16);
  }

  isFavorite(){
    let fav = this.stringToArray(localStorage.getItem('favoriten'));
    if(this.contains(fav,this.wunsch.id)){
      this.favorit = true;
      return true;
    }else{
      this.favorit = false;
      return false;
    }
  }

  favorite(){
    let fav = this.stringToArray(localStorage.getItem('favoriten'));
    fav.push(this.wunsch.id);
    localStorage.setItem('favoriten',fav.toString());
    this.favorit = true;
  }

  unfavorite(){
    let fav = this.stringToArray(localStorage.getItem('favoriten'));
    let index = fav.indexOf(this.wunsch.id);
    let newFav = [];
    for(var i=0; i<fav.length; i++){
      if(i<index){
        newFav[i] = fav[i];
      }else if(i>index){
        newFav[i-1] = fav[i]
      }
    }
    localStorage.setItem('favoriten',newFav.toString());
    this.favorit = false;
  }

  neuerKommentar(){
    let msg = 'Kommentiere '.concat(this.wunsch.author.concat('s Wunsch'));
    let prompt = this.alertCtrl.create({
      title: 'neuer Kommentar',
      message: msg,
      inputs: [
        {
          name: 'kommentar',
          placeholder: 'Kommentar'
        },
      ],
      buttons: [
        {
          text: 'ne doch nicht',
          handler: data => {
            console.log('Kommentar schreiben abgebrochen');
          }
        },
        {
          text: 'kommentieren',
          handler: data => {
            console.log('neuen Kommentar verfasst');
            this.gmunklApi.addKommentar(localStorage.getItem('username').toString(),data.kommentar,this.wunsch.id)
                .subscribe( data =>{
                  this.kommentare.push(data);
                });
        }
      }
      ]
    });
    prompt.present();
  }

  checkKommentare(){
    let y = 0;
    for(var i = 0; i < this.alleKommentare.length; i++){
      if(this.alleKommentare[i].wunsch_id == this.wunsch.id){
        this.kommentare[y] = this.alleKommentare[i];
        y++;
      }
    }
  }

  stringToArray(string: string){
    let array = [];
    if(string){
      array = string.split(",");
      let buffer:string;
      for(var i=0; i<array.length; i++){
        array[i] = parseInt(array[i]);
      }
    }
    return array;
  }

  contains(a,b){
    for(var i=0;i<a.length;i++){
      if(a[i] === b){
        return true;
      }
    }
  return false;
  }

  kommentarMelden(kommentar) {
    let meldungen = [];
    meldungen = this.stringToArray(localStorage.getItem('kommentarMeldungen'));
    if(!this.contains(meldungen,kommentar.id)){  //Wenn Kommentar nicht im array gefunden wird.
      meldungen.push(kommentar.id);
      localStorage.setItem('kommentarMeldungen', meldungen.toString());

    let confirm = this.alertCtrl.create({
      title: 'Kommentar melden',
      message: 'Findest Du diesen Kommentar unangebracht und möchtest ihn melden?',
      buttons: [
            {
              text: 'abbrechen',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'melden',
              handler: () => {
                console.log('Agree clicked');
                if(kommentar.gemeldet < 5){

                  this.gmunklApi.kommentarGemeldet(kommentar)
                          .subscribe( data =>{});
                }else{
                  this.gmunklApi.deleteKommentar(kommentar).subscribe();
                }
              }
            }
          ]
        });
      confirm.present();
    }else{
      let alert = this.alertCtrl.create({
      title: 'Oh!',
      subTitle: 'Du hast diesen Kommentar bereits gemeldet!',
      buttons: ['OK']
      });
    alert.present();
    }
  }

  wunschMelden(wunsch){

    let meldungen = [];
    meldungen = this.stringToArray(localStorage.getItem('wunschMeldungen'));
    if(!this.contains(meldungen,wunsch.id)){  //Wenn Kommentar nicht im array gefunden wird.
      meldungen.push(wunsch.id);
      localStorage.setItem('wunschMeldungen', meldungen.toString());

      let confirm = this.alertCtrl.create({
            title: 'Wunsch melden',
            message: 'Findest Du diesen Wunsch unangebracht und möchtest ihn melden?',
            buttons: [
              {
                text: 'abbrechen',
                handler: () => {
                  console.log('Wunsch melden abgebrochen');
                }
              },
              {
                text: 'melden',
                handler: () => {
                  console.log('Wunsch gemeldet');
                  if(wunsch.gemeldet < 5){
                    this.gmunklApi.wunschGemeldet(wunsch)
                                  .subscribe( data =>{});
                  }else{
                    this.gmunklApi.deleteWunsch(wunsch).subscribe();
                  }
                }
              }
            ]
          });
          confirm.present();
      }else{
        let alert = this.alertCtrl.create({
        title: 'Oh!',
        subTitle: 'Du hast diesen Wunsch bereits gemeldet!',
        buttons: ['OK']
      });
      alert.present();
      }
    }
}
