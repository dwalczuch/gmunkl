import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../../shared/shared';
/**
 * Generated class for the OrganisationenDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organisationen-detail',
  templateUrl: 'organisationen-detail.html',
})
export class OrganisationenDetailPage {

  organisation: any;
  res: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private location: Location) {
    this.organisation = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganisationenDetailPage');
    //this.location.orgasLocation(this.organisation.strasse, this.organisation.hausnummer, this.organisation.plz, this.organisation.stadt).subscribe(data => {
    //    this.res = data;
    //});
  }

  ionViewWillLeave(){
    this.navCtrl.popToRoot();
  }
  
  navigate(){
    console.log(this.organisation.strasse);
    console.log(this.organisation.hausnummer);
    console.log(this.organisation.plz);
    console.log(this.organisation.stadt);

    console.log(this.organisation);

    //let res = this.location.orgasLocation(this.organisation.strasse, this.organisation.hausnummer, this.organisation.plz, this.organisation.stadt);
    //console.log(this.res[0].geometry.location);
    //console.log(typeof(res));
  }

}
