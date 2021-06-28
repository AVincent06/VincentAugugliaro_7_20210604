import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  profileId!: number;
  messages: Message[] = [];
  messagesSubscription = new Subscription();

  constructor(
    private authService : AuthService,
    private messagesService: MessageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileId = this.authService.getProfileId();
    this.messagesSubscription = this.messagesService.messagesSubject.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    this.messagesService.getMessages();
    this.messagesService.emitMessages();
  }

  /* utiliser comme isLikedBy ou isDislikedBy */
  isOneOfThem(list?: number[]): boolean {
    if( list?.find(id => id === this.profileId) ) return true;
    return false;
  }

  onLike(index: number) {
    if( this.isOneOfThem(this.messages[index].usersLiked) ) {
      this.messages[index].usersLiked?.splice(index, 1);                  // Si le like est déjà coché, on le décoche
    } else {
      this.messages[index].usersLiked?.push(this.profileId);              // Si le like n'est pas coché, on le coche
    }
    this.messages[index].likes = this.messages[index].usersLiked?.length; // Correction du total des likes

    this.messagesService.saveSingleMessage(this.messages[index].id);
    this.messagesService.emitMessages();
  }

  onDislike(index: number) {
    if( this.isOneOfThem(this.messages[index].usersDisliked) ) {
      this.messages[index].usersDisliked?.splice(index, 1);                  // Si le dislike est déjà coché, on le décoche
    } else {
      this.messages[index].usersDisliked?.push(this.profileId);              // Si le dislike n'est pas coché, on le coche
    }
    this.messages[index].dislikes = this.messages[index].usersDisliked?.length; // Correction du total des likes

    this.messagesService.saveSingleMessage(this.messages[index].id);
    this.messagesService.emitMessages();
  }

  onShow(index: number) {
    let myElement = document.getElementById("comments-" + index);
    if(myElement!.style.display === "none") {
      myElement!.style.display = "block";
    } else {
      myElement!.style.display = "none";
    }
  }

  onViewMessage(id: number) {
    // this.router.navigate(['/message', 'view', id]) créer le component de vue unique ou rediriger vers message?
  }

  updateMessageComments(index: number) {
    this.messages[index].comments!++;
  }

}
