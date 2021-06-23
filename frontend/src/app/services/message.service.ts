import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messagesSubject = new Subject<Message[]>();

  constructor() { }

  emitMessages(): void {
    this.messagesSubject.next(this.messages);
  }

  saveMessages(): void {
    // sauvegarde de this.Messages dans la BDD via l'API
  }

  getMessages(): void {
    // chargement des données dans this.messages via l'API
    // SELECT Message.*, Profile.prenom, Profile.nom, Profile.photo 
    // FROM Message INNER JOIN Profile ON Message.profile_id = Profile.id
    // WHERE Message.create IN(dans les 10 derniers);
    this.messages = [
      {
        id: 0, 
        profile_id: 1,
        picture: 'https://www.letelegramme.fr/ar/imgproxy.php/images/2020/12/01/coucher-de-soleil-photographie-depuis-la-corniche-a_5419565_676x337p.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [1,2],
        usersDisliked: [3],
        likes: 2,
        dislikes: 1,
        comments: 0,
        create: '19-06-2021',
        update: '',
        profile_photo : 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        profile_nom: 'defamille',
        profile_prenom: 'toto'
      },
      {
        id: 1, 
        profile_id: 2,
        picture: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [2],
        usersDisliked: [1,3],
        likes: 1,
        dislikes: 2,
        comments: 0,
        create: '20-06-2021',
        update: '21-06-2021',
        profile_photo : '../../assets/images/profile.png',
        profile_nom: 'defamille1',
        profile_prenom: 'toto1'
      },
      {
        id: 2, 
        profile_id: 3,
        picture: 'https://media.giphy.com/media/WTQcLBrPZt2sLvgIsk/giphy.gif',
        text: '',
        usersLiked: [1,2,3],
        usersDisliked: [],
        likes: 3,
        dislikes: 0,
        comments: 0,
        create: '21-06-2021',
        update: '',
        profile_photo : 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        profile_nom: 'defamille2',
        profile_prenom: 'toto2'
      }
    ];

    this.emitMessages();
  }

  getSingleMessage(id: number): Observable<Message> {
    // chargement des données du message ciblé via l'API
    this.messages = [
      {
        id: 0, 
        profile_id: 1,
        picture: 'https://www.letelegramme.fr/ar/imgproxy.php/images/2020/12/01/coucher-de-soleil-photographie-depuis-la-corniche-a_5419565_676x337p.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [1,2],
        usersDisliked: [3],
        likes: 2,
        dislikes: 1,
        comments: 0,
        create: '19-06-2021',
        update: '',
        profile_photo : 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        profile_nom: 'defamille',
        profile_prenom: 'toto'
      },
      {
        id: 1, 
        profile_id: 2,
        picture: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [2],
        usersDisliked: [1,3],
        likes: 1,
        dislikes: 2,
        comments: 0,
        create: '20-06-2021',
        update: '21-06-2021',
        profile_photo : '../../assets/images/profile.png',
        profile_nom: 'defamille1',
        profile_prenom: 'toto1'
      },
      {
        id: 2, 
        profile_id: 3,
        picture: 'https://media.giphy.com/media/WTQcLBrPZt2sLvgIsk/giphy.gif',
        text: '',
        usersLiked: [1,2,3],
        usersDisliked: [],
        likes: 3,
        dislikes: 0,
        comments: 0,
        create: '21-06-2021',
        update: '',
        profile_photo : 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        profile_nom: 'defamille2',
        profile_prenom: 'toto2'
      }
    ];

    return of(this.messages[id]);
  }

  createNewMessage(newMessage: Message) {
    this.messages.push(newMessage);
    this.saveMessages();
    this.emitMessages();
  }

  removeMessage(message: Message): void {
    const messageIndexToRemove = this.messages.findIndex(
      (messageElement) => {
        if(messageElement === message) {
          return true;
        }
        return false;
      }
    );
    this.messages.splice(messageIndexToRemove, 1);
    this.saveMessages();
    this.emitMessages();
  }

}
