import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeelingService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  addLike(messageId: number): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/feelings/like',
      {messageId: messageId},
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  addDislike(messageId: number): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/feelings/dislike',
      {messageId: messageId},
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  delLike(messageId: number): Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/feelings/like/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  delDislike(messageId: number): Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/feelings/dislike/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
