import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CommentRes } from '../models/comment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: CommentRes[] = [];
  commentsSubject = new Subject<CommentRes[]>();

  constructor( private http: HttpClient, private authService: AuthService ) { 
    this.comments = [
      {
        id: 0,
        message_id: 0,
        date: Date.now(),
        text: 'mon premier super commentaire.',
        profile_id: 2,
        profile_firstname: 'toto1',
        profile_name: 'defamille1',
        profile_photo: '../../assets/images/profile.png'
      }
    ];
   }

  emitComments(): void {
    this.commentsSubject.next(this.comments);
  }

  saveComments(): void {
    // sauvegarde de this.Comments dans la BDD via l'API
  }

  saveSingleComment(messageId: number): void {
    // sauvegarde de this.comments[commentId] dans la BDD via l'API
  }

  getComments(messageId: number): void {
    // GET à l'API avec messageId en paramètre
    // SELECT * FROM Comments WHERE Comments.message = message_id;
    this.emitComments();
  }

  getSingleComment(id: number): Observable<CommentRes> {
    // chargement des données du commentaire ciblé via l'API
    return of(this.comments[id]);
  }

  removeComment(comment: CommentRes): void {
    const commentIndexToRemove = this.comments.findIndex(
      (commentElement) => {
        if(commentElement === comment) {
          return true;
        }
        return false;
      }
    );
    this.comments.splice(commentIndexToRemove, 1);
    this.saveComments();
    this.emitComments();
  }

  /*---------------------- En accord avec le backend à partir de là ---------------------------*/

  createNewComment(feedback: string, messageId: number): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/comments',
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

}
