import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  messages: Message[] = [];
  messagesSubscription = new Subscription();

  constructor(private messagesService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.messagesSubscription = this.messagesService.messagesSubject.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    this.messagesService.getMessages();
    this.messagesService.emitMessages();
  }

  onViewMessage(id: number) {
    // this.router.navigate(['/message', 'view', id]) créer le component de vue unique ou rediriger vers message?
  }

}
