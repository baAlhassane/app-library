import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as firebase from '@angular/fire'
// import { Auth } from '@angular/fire/auth';
 import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
@Injectable({
  providedIn: 'root',
})

export class AuthService {

errorMessage:string;
  constructor( ) { }

 
 // Sign up with email/password withe   import { AngularFireAuth } from '@angular/fire/compat/auth';
 

  // Sign up with email/password
  createNewUser(email: string, password: string) {
     const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        
        const user = userCredential.user;
        console.log(user.email)
        console.log(userCredential)
        // ...
      })
      .catch((err) => {
        this.errorMessage=err.message;
        console.log(err.code);
        console.log(err.message);
        this.errorMessage=err.message;
        console.log(err.message);
      });
  }



  // Sign in with email/password
  async SignInUser(email: string, password: string) {


    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      console.log(user.email);
    } catch (err) {
      console.log(err);
      console.log(err);
    }
  }


  signOutUser(): void {
    const auth = getAuth();
    signOut(auth)
  }


}