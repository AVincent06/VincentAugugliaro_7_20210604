import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment_get } from '../models/comment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Comment_get[] = [];
  

  constructor( private http: HttpClient, private authService: AuthService ) { 
    this.comments = [];
  }

  saveComments(): void {
    // sauvegarde de this.Comments dans la BDD via l'API
  }

  saveSingleComment(messageId: number): void {
    // sauvegarde de this.comments[commentId] dans la BDD via l'API
  }

  
  getSingleComment(id: number): Observable<Comment_get> {
    // chargement des données du commentaire ciblé via l'API
    return of(this.comments[id]);
  }
  
  
  /*---------------------- En accord avec le backend à partir de là ---------------------------*/
    
  createNewComment(feedback: string, messageId: number): Observable<any> {
    return this.http.post(
      `${environment.URL_BACKEND}/api/comments`,
      {
        feedback: feedback,
        messageId: messageId
      },
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
    
  getCommentsByMessage(messageId: number): Observable<Comment_get[]> {
    return this.http.get<Comment_get[]>(
      `${environment.URL_BACKEND}/api/comments/message/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
      
  removeComment(id: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/comments/${id}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
    