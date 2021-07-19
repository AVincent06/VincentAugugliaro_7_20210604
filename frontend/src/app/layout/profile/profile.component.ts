import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
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
    password: new FormControl(''),
    passwordcheck: new FormControl(''),
    bio : new FormControl('')
  });
  profile!: Profile;
  profileSubscription = new Subscription();
  selectedFile: File | any;
  hide: boolean = true;
  hide2: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileSubscription = this.profileService.profileSubject.subscribe(
      (profile: Profile) => {
        this.profile = profile;
      }
    );
    this.profileService.getSingleProfile(2);
    this.profileService.emitSingleProfile();

    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.formBuilder.group({
      photo: [],
      firstname: [this.profile.firstname, [Validators.pattern('^[a-zA-Z]+$')]],
      name: [this.profile.name, [Validators.pattern('^[a-zA-Z]+$')]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      password: ['', [Validators.pattern('[0-9a-zA-Z]{12,}')]],
      passwordcheck: ['', [Validators.pattern('[0-9a-zA-Z]{12,}')]],
      bio: [this.profile.bio]
    })
    this.selectedFile = this.profile.photo;
  }

  onChange(event: any) {
    var reader = new FileReader();
    
    this.selectedFile = <File>event.target.files[0];
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => { 
      this.selectedFile = reader.result; 
    }
  }

  onSubmit() {
    const photo = this.profileForm.get('photo')!.value;
    const firstname = this.profileForm.get('firstname')!.value;
    const name = this.profileForm.get('name')!.value;
    const email = this.profileForm.get('email')!.value;
    const password = this.profileForm.get('password')!.value;
    const bio = this.profileForm.get('bio')!.value;
    
    // this.authService.createNewUser(email, password).subscribe(data =>{
    //   if(data) {
    //     this.router.navigate(['news']);
    //   } else {
    //     this.router.navigate(['signin']);
    //     this.errorMessage = "Erreur";
    //   }
    // });
  }
}