import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router'
import { getAuth ,onAuthStateChanged} from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

auth=getAuth()
  constructor(
    private router: Router
  ) { }

  canActivate():Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve,reject)=>{
        onAuthStateChanged(this.auth, (user) => {
          if(user){
            resolve(true)
          }
          else{
            this.router.navigate(["/auth","signin"])
            resolve(false);
          }
        })
      }
      );
  }

  
}
 

