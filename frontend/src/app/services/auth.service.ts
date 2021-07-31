import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      'http://localhost:8080/api/users', 
      { firstname: firstname, name: name, email: email, password: password }, 
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    );  
  }  
    
  isUserLoggedIn(): Observable<boolean> { 
    return this.isLog$;                   
  }
  
  getIsAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }  

  getProfileId(): number {
    return parseInt(localStorage.getItem('userId')!, 10);
  }  

  getToken(): string {
    return localStorage.getItem('token')!;
  }  

  signInUser(email: string, password: string): Observable<object> {
    return this.http.post<Object>(
      'http://localhost:8080/api/users/identify', 
      { email: email, password: password }, 
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    );  
  }  

  setSession(signInResult: any, _callback: Function) {
    localStorage.setItem('userId', signInResult.userId);
    localStorage.setItem('isAdmin', signInResult.isAdmin);
    localStorage.setItem('token', signInResult.token);
    this.isLog$.next(true);
    _callback();
  }  

  signOutUser(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    this.isLog$.next(false); 
  }

}