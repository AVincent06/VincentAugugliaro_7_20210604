import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  signInForm = new FormGroup({  
    email : new FormControl(''),
    password : new FormControl('')
  });
  errorMessage: string = '';
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{12,}')]]
    })
  }

  onSubmit() {
    const email = this.signInForm.get('email')!.value;
    const password = this.signInForm.get('password')!.value;
    
    this.authService.signInUser(email, password).subscribe(data =>{
      if(data) {
        this.router.navigate(['news']);
      } else {
        this.router.navigate(['signin']);
        this.errorMessage = "Erreur";
      }
    });
  }

}
