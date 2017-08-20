import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartProvider } from '../../providers/start/start';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  public name: string;
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private startProvider: StartProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  start(){
    if(!this.startProvider.setName(this.name)){
      this.message = 'Dein Name muss mindestens 3 Zeichen enthalten';
    }else{
      this.navCtrl.setRoot(TabsPage);
    }
  }


}
