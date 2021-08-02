import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeelingService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  addLike(messageId: number): Observable<any> {
    return this.http.post(
      `${environment.URL_BACKEND}/api/feelings/like`,
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
      `${environment.URL_BACKEND}/api/feelings/dislike`,
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
      `${environment.URL_BACKEND}/api/feelings/like/${messageId}`,
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
      `${environment.URL_BACKEND}/api/feelings/dislike/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
