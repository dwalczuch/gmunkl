import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GmunklApi } from '../../shared/shared';
import { OrganisationenDetailPage } from '../pages';
import { Location } from '../../shared/shared';
/**
 * Generated class for the OrganisationenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-organisationen',
  templateUrl: 'organisationen.html',
})
export class OrganisationenPage {

  alleOrganisationen = [];
  organisationen = [];
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private gmunklApi: GmunklApi, private location: Location) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganisationenPage');
    this.gmunklApi.getOrganisationen()
        .subscribe(data =>{
          //for(var i=0; i<data.length; i++){
            //console.log(data[i].strasse + data[i].hausnummer + data[i].plz + data[i].stadt);
            //this.location.getOrgaLocation(data[i].strasse, data[i].hausnummer, data[i].plz, data[i].stadt).subscribe(dat =>{
              //let long = dat.lng;
              //let lat = dat.lat;
              //if(this.location.checkOrgaLocation(lat,long)){
              //  console.log(data[i]);
            //  }
            //});
          //}
          //console.log(this.organisationen);
          for(var i=0; i<data.length; i++){
            if(data[i].beschreibung.length > 180){
              data[i].zusammenfassung = data[i].beschreibung.substring(0,179).concat('...');
            }else{
              data[i].zusammenfassung = data[i].beschreibung;
            }

          }
          this.alleOrganisationen = data;
          this.organisationen = data;
        });
  }

  getItems(ev: any){    //funktion zum filtern von Organisationen für SearchBar!
    this.organisationen = JSON.parse(JSON.stringify(this.alleOrganisationen));
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.organisationen = this.organisationen.filter((organisation) => {
        return (organisation.stadt.toLowerCase().indexOf(val.toLowerCase()) > -1 || organisation.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  showOrganisation(organisation){
    //this.gmunklApi.setAktuellerWunsch(wunsch);
    this.navCtrl.push(OrganisationenDetailPage, organisation);
  }



}
