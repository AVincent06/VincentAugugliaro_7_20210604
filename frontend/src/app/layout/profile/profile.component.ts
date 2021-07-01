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
    prenom : new FormControl(''),
    nom : new FormControl(''),
    email : new FormControl(''),
    bio : new FormControl('')
  });
  profile!: Profile;
  profileSubscription = new Subscription();
  selectedFile: File | any;

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
      photo: [this.profile.photo],
      prenom: [this.profile.prenom, [Validators.pattern('^[a-zA-Z]+$')]],
      nom: [this.profile.nom, [Validators.pattern('^[a-zA-Z]+$')]],
      email: [this.profile.email, [Validators.required, Validators.email]],
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
    const prenom = this.profileForm.get('prenom')!.value;
    const nom = this.profileForm.get('nom')!.value;
    const email = this.profileForm.get('email')!.value;
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