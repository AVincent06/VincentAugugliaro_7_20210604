import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({  
    email : new FormControl(''),
    password : new FormControl(''),
    passwordcheck : new FormControl('')
  });
  errorMessage: string = '';
  hide: boolean = true;
  hide2: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{12,}')]],
      passwordcheck: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{12,}')]]
    })
  }

  onSubmit() {
    const email = this.signUpForm.get('email')!.value;
    const password = this.signUpForm.get('password')!.value;
    
    if(this.authService.createNewUser(email, password)) {
      this.router.navigate(['/news']);
    } else {
      this.errorMessage = "Erreur";
    }
  }

}
