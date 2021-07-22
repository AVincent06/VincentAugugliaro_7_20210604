import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Profile, Profile_private } from 'src/app/models/profile.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({  
    firstname : new FormControl(''),
    name : new FormControl(''),
    email : new FormControl(''),
    oldpassword: new FormControl(''),
    newpassword: new FormControl(''),
    bio : new FormControl('')
  });
  profile!: Profile;
  selectedFile: File | any;
  hide: boolean = true;
  hide2: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.profileService.getSingleProfile(this.authService.getProfileId()).subscribe(data => {
      this.profile = data;
      this.initForm();
    });
  }

  initForm(): void {
    this.profileForm = this.formBuilder.group({
      photo: [],
      firstname: [this.profile.firstname, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      name: [this.profile.name, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      oldpassword: [{value: '', disabled: true}, [Validators.pattern('[0-9a-zA-Z]{12,}')]], // fonctionnalité en attente
      newpassword: [{value: '', disabled: true}, [Validators.pattern('[0-9a-zA-Z]{12,}')]], // fonctionnalité en attente
      bio: [this.profile.bio]
    });
    this.selectedFile = this.profile.photo;
  }

  onChange(event: Event) {
    var reader = new FileReader();
    let file;
    if((event.target as HTMLInputElement).files != null) {
      file = (event.target as HTMLInputElement).files![0];
      this.profileForm.get('photo')!.setValue(file);
      this.profileForm.updateValueAndValidity();
      reader.onload = (_event) => { 
        this.selectedFile = reader.result; 
      }
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.profileService.setSingleProfile(this.authService.getProfileId(), {
      firstname: this.profileForm.get('firstname')!.value,
      name: this.profileForm.get('name')!.value,
      email: this.profileForm.get('email')!.value,
      bio: this.profileForm.get('bio')!.value,
      photo: this.profile.photo,
      file: this.profileForm.get('photo')!.value
    }).subscribe(() => {
      console.log('update ok?'); 
    });
  }
}