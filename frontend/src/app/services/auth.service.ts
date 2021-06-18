import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean;
  isLog$: Subject<boolean> = new Subject<boolean>();  // code pour l'observable de la session

  constructor() {
    this.isLoggedIn = false;
    this.isLog$.next(this.isLoggedIn);  // code pour l'observable de la session
  }

  createNewUser(email: string, password: string): Observable<boolean> {  // code pour l'observable de la session
    console.log('signup+login');  // TEST

    if (true) { // ACCES A LA BDD POUR VERIFIER L'ACCES
      this.isLoggedIn = true;
      this.isLog$.next(this.isLoggedIn);  // code pour l'observable de la session
      return of(this.isLoggedIn);
    }
  }

  signInUser(email: string, password: string): Observable<boolean> {  // code pour l'observable de la session
    console.log('login');  // TEST

    if (true) { // ACCES A LA BDD POUR VERIFIER L'ACCES
      this.isLoggedIn = true;
      this.isLog$.next(this.isLoggedIn);  // code pour l'observable de la session
      return of(this.isLoggedIn);
    }
  }

  isUserLoggedIn(): Observable<boolean> { // code pour l'observable de la session
    return this.isLog$;                   // code pour l'observable de la session
  }

  signOutUser(): void {
    console.log('Logout');  // TEST
    this.isLoggedIn = false;
    this.isLog$.next(this.isLoggedIn);  // code pour l'observable de la session
  }

}