import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { resolve } from 'dns';

import { getAuth ,onAuthStateChanged} from 'firebase/auth';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
	errorMessage: string
	auth=getAuth()

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) { }


	ngOnInit(): void {
		this.initForm();

	}


	initForm() {
		this.signInForm = this.formBuilder.group(
			{
				email: ["", [Validators.required, Validators.email]],
				password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
			}
		);
	}


	onSubmit() {
		const email = this.signInForm.get("email")?.value;
		const password = this.signInForm.get("password")?.value;
        this.authService.SignInUser(email, password).then(
			onAuthStateChanged(this.auth, (user) => {
					if(user){
						this.router.navigate(["/books"]) ;
					}
					else{
					  this.router.navigate(["/auth","signin"])
	
					}
				  })
		)
		
		

		// if(this.authService.errorMessage ){
		// 	this.router.navigate(["/auth/signin"]) ;
		// 	this.errorMessage=this.authService.errorMessage

		// }
		// else{ 
		// this.router.navigate(["/books"]) ;
		
		
			
		 }
	
		
		
		


	}




