import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  editorForm = new FormGroup({  
    editor : new FormControl('')
  });

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editorForm = this.formBuilder.group({
      editor: ['']
    })
  }

  onSubmit() {
    const editor = this.editorForm.get('editor')!.value;

    this.messagesService.createNewMessage(editor);
    // if(editor) {
    //   this.router.navigate(['news']);
    // } else {
    //   this.router.navigate(['submit']);
    // } 
  }

}
