import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean;
  isLog$: Subject<boolean> = new Subject<boolean>();  // code pour l'observable de la session
  private profileId: number;
  private isAdmin: boolean;

  constructor() {
    this.profileId = -1;
    this.isAdmin = false;
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

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getProfileId(): number {
    return this.profileId;
  }

  signInUser(email: string, password: string): Observable<boolean> {  // code pour l'observable de la session
    console.log('login');  // TEST

    if (true) { // ACCES A LA BDD POUR VERIFIER L'ACCES
      this.isLoggedIn = true;
      this.profileId = 2; // POUR TEST EN ATTENDANT LA REPONSE SERVEUR
      this.isAdmin = true;// POUR TEST EN ATTENDANT LA REPONSE SERVEUR
      this.isLog$.next(this.isLoggedIn);  // code pour l'observable de la session
      return of(this.isLoggedIn);
    }
  }

  isUserLoggedIn(): Observable<boolean> { // code pour l'observable de la session
    return this.isLog$;                   // code pour l'observable de la session
  }

  signOutUser(): void {
    console.log('Logout');  // TEST
    this.profileId = -1;  // en attendant de trouver mieux
    this.isLoggedIn = false;
    this.isLog$.next(this.isLoggedIn);  // code pour l'observable de la session
  }

}