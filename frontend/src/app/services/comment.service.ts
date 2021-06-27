import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CommentRes } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: CommentRes[] = [];
  commentsSubject = new Subject<CommentRes[]>();

  constructor() { 
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

  saveSingleComment(commentId: number): void {
    // sauvegarde de this.comments[commentId] dans la BDD via l'API
  }

  getComments(): void {
    // chargement des données dans this.messages via l'API
    // SELECT Message.*, Profile.prenom, Profile.nom, Profile.photo 
    // FROM Message INNER JOIN Profile ON Message.profile_id = Profile.id
    // WHERE Message.create IN(dans les 10 derniers);
    this.emitComments();
  }

  getSingleComment(id: number): Observable<CommentRes> {
    // chargement des données du commentaire ciblé via l'API
    return of(this.comments[id]);
  }

  createNewComment(mySubmit: string, myMessage: number) {
    this.comments.push( // POUR TESTER
      {
        id: 1,
        message_id: myMessage,
        date: Date.now(),
        text: mySubmit,
        profile_id: 2,
        profile_firstname: 'toto1',
        profile_name: 'defamille1',
        profile_photo: '../../assets/images/profile.png'
      }
    );
    this.saveComments();
    this.emitComments();
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

}
