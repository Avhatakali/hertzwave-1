import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { login } from '../../app/resources/Login';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DatabaseProvider Provider');
  }




  getLoginDetails(email:string, password:string) {


  return firebase.auth().signInWithEmailAndPassword(email, password);
    
 
  }


 
  registerUser(name,surname,email,password,location,phone)
  {

        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            
          var userID = firebase.auth().currentUser.uid;

          if(userID!=null)
          {
            firebase.database().ref('Registration/' +userID).set({
    
            
              surname:surname,
              location:location,
              phone:phone,
              email:email,
              password:password
        
            });
          }

        });
  }

  registration(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  login(email:string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getPlace() {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyCaiFLiLXtxHiy2O3wp1C3B9QreRdk42cQ';
    
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }


forgetPassword(){
  
}

}