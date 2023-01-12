import { Component } from '@angular/core';


// import { getAnalytics } from "firebase/analytics";
import * as firebase from 'firebase/app'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor() {

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSfOq9Ob4Ma7njVaNXltGe7l98OLJhm0U",
  authDomain: "http-client-demo-c2aa0.firebaseapp.com",
  databaseURL: "https://http-client-demo-c2aa0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "http-client-demo-c2aa0",
  storageBucket: "http-client-demo-c2aa0.appspot.com",
  messagingSenderId: "22360712511",
  appId: "1:22360712511:web:0e4738a8daf32dfc7d1f8a",
  measurementId: "G-PX2040GXV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


	}




}
