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
    this.messages = [
      {
        id: 0, 
        profile_id: 1,
        picture: 'https://www.letelegramme.fr/ar/imgproxy.php/images/2020/12/01/coucher-de-soleil-photographie-depuis-la-corniche-a_5419565_676x337p.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [1,2],
        usersDisliked: [3],
        create: '19-06-2021',
        update: ''
      },
      {
        id: 1, 
        profile_id: 2,
        picture: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [2],
        usersDisliked: [1,3],
        create: '20-06-2021',
        update: '21-06-2021'
      },
      {
        id: 2, 
        profile_id: 3,
        picture: 'https://media.giphy.com/media/WTQcLBrPZt2sLvgIsk/giphy.gif',
        text: '',
        usersLiked: [3],
        usersDisliked: [1,2],
        create: '21-06-2021',
        update: ''
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
        create: '19-06-2021',
        update: ''
      },
      {
        id: 1, 
        profile_id: 2,
        picture: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste similique nihil quidem commodi laboriosam in? A nemo provident nulla? Voluptates eius quia dolorem dolore temporibus et eligendi expedita reprehenderit commodi!',
        usersLiked: [2],
        usersDisliked: [1,3],
        create: '20-06-2021',
        update: '21-06-2021'
      },
      {
        id: 2, 
        profile_id: 3,
        picture: 'https://media.giphy.com/media/WTQcLBrPZt2sLvgIsk/giphy.gif',
        text: '',
        usersLiked: [3],
        usersDisliked: [1,2],
        create: '21-06-2021',
        update: ''
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
