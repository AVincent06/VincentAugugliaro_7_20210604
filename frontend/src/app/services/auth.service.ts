import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLog$: Subject<boolean> = new Subject<boolean>();  // code pour l'observable de la session

  constructor( private http: HttpClient ) {
    this.isLog$.next(false);
  }

  createNewUser(firstname: string, name: string, email: string, password: string): Observable<object> {
    return this.http.post<Object>(
      `${environment.URL_BACKEND}/api/users`, 
      { firstname: firstname, name: name, email: email, password: password }, 
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    );  
  }  
    
  isUserLoggedIn(): Observable<boolean> { // pour le menu réactif
    return this.isLog$;                   
  }

  isConnected(): boolean {
    if(sessionStorage.getItem('token') !== null) {
      this.isLog$.next(true);
      return true;
    }
    return false;
  }
  
  getIsAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }  

  getProfileId(): number {
    return parseInt(sessionStorage.getItem('userId')!, 10);
  }  

  getToken(): string {
    return sessionStorage.getItem('token')!;
  }  

  signInUser(email: string, password: string): Observable<object> {
    return this.http.post<Object>(
      `${environment.URL_BACKEND}/api/users/identify`, 
      { email: email, password: password }, 
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    );  
  }  

  setSession(signInResult: any, _callback: Function) {
    sessionStorage.setItem('userId', signInResult.userId);
    sessionStorage.setItem('isAdmin', signInResult.isAdmin);
    sessionStorage.setItem('token', signInResult.token);
    this.isLog$.next(true);
    _callback();
  }  

  signOutUser(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('token');
    this.isLog$.next(false); 
  }

}