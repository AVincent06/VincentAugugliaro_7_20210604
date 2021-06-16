import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  createNewUser(email: string, password: string): boolean {
    console.log('email: '+email+' , password: '+password);  // TEST

    return true;
  }

  signInUser(email: string, password: string): Observable<boolean> {
    console.log('login');  // TEST

    if (true) { // ACCES A LA BDD POUR VERIFIER L'ACCES
      this.isLoggedIn = true;
      return of(this.isLoggedIn);
    }
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  signOutUser(): void {
    console.log('Logout');  // TEST

    this.isLoggedIn = false;
  }

}