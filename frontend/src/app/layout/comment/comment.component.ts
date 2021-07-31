import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  @Output() updateNbComments = new EventEmitter<number>();
  profileId!: number;
  isAdmin!: boolean;
  comments: CommentRes[] = [];
  commentsSubscription = new Subscription();
  commentForm = new FormGroup({  
    comment : new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.profileId = this.authService.getProfileId();
    this.isAdmin = this.authService.getIsAdmin();
    this.commentsSubscription = this.commentService.commentsSubject.subscribe(
      (comments: CommentRes[]) => {
        this.comments = comments;
      }
    );

    this.initForm();

    this.commentService.getComments(this.messageId);
  }

  initForm(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['']
    })
  }

  onDelete(id: number): void {
    this.commentService.removeComment(this.comments[id]);
    this.updateNbComments.emit(this.messageId);
  }

  onSubmit() {
    const comment = this.commentForm.get('comment')!.value;
    
    this.commentService.createNewComment(comment, this.messageId).subscribe(() => {
      this.updateNbComments.emit(this.messageId);
      this.commentForm.reset();
    });
  }

}
