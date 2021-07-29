import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  editorForm = new FormGroup({  
    picture : new FormControl(''),
    editor : new FormControl('')
  });
  selectedFile: File | any;

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessageService,
              private router: Router, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editorForm = this.formBuilder.group({
      editor: [''],
      picture: []
    })
  }

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.editorForm.get('picture')!.setValue(file, {emitModelToViewChange: false});
    this.editorForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.messagesService.postMessage({
      file: this.editorForm.get('picture')!.value,
      article: this.editorForm.get('editor')!.value,
      user_id: this.authService.getProfileId()
    }).subscribe(() => {
      console.log('Nouveau message posté!');
      this.router.navigate(['news']);
    }); 
  }

}
