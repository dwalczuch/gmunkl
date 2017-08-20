import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
/*
  Generated class for the StartProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StartProvider {

  username = "";

  constructor(public http: Http) {
    console.log('Hello StartProvider Provider');
    this.getUsername();
  }

  getUsername(){
    if(localStorage.getItem('username')){
      this.username = localStorage.getItem('username').toString();
    }
  }

  login(){
    return new Promise((resolve) =>{
      if(this.username === ""){
        resolve(false);
      }else{
        resolve(true);
      }
    });
  }

  isLoggedIn(){
    if(localStorage.getItem('username')){
      if(localStorage.getItem('username').toString() !== "" && localStorage.getItem('username').toString().length > 2){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  setName(name){
    if(name && name !== '' && name.length > 2){
      localStorage.setItem('username',name);
      this.username = name;
      this.getUsername();
      console.log(this.username);
      return true;
    }else{
      return false;
    }
  }

}
