import { Component, OnInit } from '@angular/core';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   auth = getAuth();
   isAuth:boolean;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
onAuthStateChanged(this.auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    this.isAuth=true;
    console.log(" utilisateur connecté !  ")
    console.log(this.isAuth)
    // ...
  } else {
    // User is signed out
    // ...
    this.isAuth=false;
    console.log("utilisateur deconnecté ! ")
    console.log(this.isAuth)
  }
});
  }
onSignOut(){
  this.authService.signOutUser()
}

}
