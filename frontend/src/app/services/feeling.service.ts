import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeelingService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  addLike(messageId: number, userId: number): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/feelings/like/${messageId}`,
      {userId: userId},
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
