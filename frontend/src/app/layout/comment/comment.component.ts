import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentRes } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() messageId!: number;
  profileId!: number;
  comments: CommentRes[] = [];
  commentsSubscription = new Subscription();

  constructor(
    private authService : AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.profileId = this.authService.getProfileId();
    this.commentsSubscription = this.commentService.commentsSubject.subscribe(
      (comments: CommentRes[]) => {
        this.comments = comments;
      }
    );
    this.commentService.getComments();
    this.commentService.emitComments();
  }

}
