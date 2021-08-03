import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile, Profile_private } from 'src/app/models/profile.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ConfirmationComponent } from '../shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    photo : new FormControl(''),  // RAJOUTER LE 24 07 2021
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
  myFile: File | any;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
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
      firstname: [this.profile.firstname],  //[Validators.required, Validators.pattern('^[a-zA-Z]+$')]
      name: [this.profile.name],  //[Validators.required, Validators.pattern('^[a-zA-Z]+$')]
      email: [this.profile.email, [Validators.required, Validators.email]],
      oldpassword: [{value: '', disabled: true}], // fonctionnalité en attente
      newpassword: [{value: '', disabled: true}], // fonctionnalité en attente
      bio: [this.profile.bio]
    });
    this.selectedFile = this.profile.photo;
  }

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.myFile = file;
    this.profileForm.get('photo')!.setValue(file, {emitModelToViewChange: false});
    this.profileForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer votre profil?',
        buttonText: {
          ok: 'Supprimer',
          cancel: 'Annuler'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Effacer le profil après confirmation
        this.profileService.delSingleProfile(this.authService.getProfileId()).subscribe(() => {
        console.log("Le profil a été supprimé!");
        this.authService.signOutUser();
        this.router.navigate(['signout']);
        });
      }
    });
  }

  onSubmit() {
    this.profileService.setSingleProfile(this.authService.getProfileId(), {
      firstname: this.profileForm.get('firstname')!.value,
      name: this.profileForm.get('name')!.value,
      email: this.profileForm.get('email')!.value,
      bio: this.profileForm.get('bio')!.value,
      photo: this.profile.photo,
      file: this.myFile
    }).subscribe(() => {
      console.log('update effectué'); 
    });
  }
}