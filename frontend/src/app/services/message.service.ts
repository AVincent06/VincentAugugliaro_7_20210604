import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message, Message_news, Message_post } from '../models/message.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private http: HttpClient, private authService: AuthService ) {}

  saveMessages(): void {
    // sauvegarde de this.Messages dans la BDD via l'API
  }

  saveSingleMessage(messageId: number): void {
    // sauvegarde de this.messages[messageId] dans la BDD via l'API
  }

  getMessages(): void {
    // chargement des données dans this.messages via l'API
    // SELECT Message.*, Profile.firstname, Profile.name, Profile.photo 
    // FROM Message INNER JOIN Profile ON Message.profile_id = Profile.id
    // WHERE Message.create IN(dans les 10 derniers);
  }

  getSingleMessage(id: number){
    // chargement des données du message ciblé via l'API
  }

  /*---------------------- En accord avec le backend à partir de là ---------------------------*/
  postMessage(message: Message_post): Observable<any> {

    // Adoption d'un FormData pour résoudre un problème d'upload de fichier
    let formData = new FormData();
    formData.append('file', message.file as File);
    formData.append('article', message.article as string);
    formData.append('user_id', message.user_id.toString());

    return this.http.post(
      `${environment.URL_BACKEND}/api/messages/`,
      formData,
      { 
        headers: new HttpHeaders({
          //'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
    
  getNewsByAmount(nb: number): Observable<Message_news> {
    return this.http.get<Message_news>(
      `${environment.URL_BACKEND}/api/messages/amount/${nb}/news`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
  
  delMessage(id: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/messages/${id}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}