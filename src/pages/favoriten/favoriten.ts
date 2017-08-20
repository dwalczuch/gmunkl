import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GmunklApi } from '../../shared/shared';
import { WunschDetailPage } from '../pages';

/**
 * Generated class for the FavoritenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favoriten',
  templateUrl: 'favoriten.html',
})
export class FavoritenPage {

  alleWuensche = [];
  wuensche = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private gmunklApi: GmunklApi) {
  }

  ionViewDidLoad() {
    this.gmunklApi.getWuensche()
          .subscribe( data =>{
          this.alleWuensche = data;
          });
          if(this.wuensche.length === 0)
          setTimeout(() => this.filterWuensche(), 500)
  }

  ionViewDidEnter(){
    this.wuensche = [];
    this.filterWuensche();

  }

  showWunsch($event, wunsch){
    this.gmunklApi.setAktuellerWunsch(wunsch);
    this.navCtrl.push(WunschDetailPage, wunsch);
  }

  filterWuensche(){
    for(var i=0;i<this.alleWuensche.length;i++){
      if(this.isFavorite(this.alleWuensche[i])){
        this.wuensche.push(this.alleWuensche[i]);
      }
    }
  }

  isFavorite(wunsch){
    let fav = this.stringToArray(localStorage.getItem('favoriten'));
    if(this.contains(fav,wunsch.id)){
      return true;
    }else{
      return false;
    }
  }

  contains(a,b){
    for(var i=0;i<a.length;i++){
      if(a[i] === b){
        return true;
      }
    }
    return false;
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

}
