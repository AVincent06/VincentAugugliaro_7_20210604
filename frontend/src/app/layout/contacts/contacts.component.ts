import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
import { Profile, Profile_public } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  profiles: Profile_public[] = [];

  constructor(private profilesService: ProfileService, 
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Groupomania - Liste des contacts');
  }

  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }

  onViewProfile(id: number) {
    // this.router.navigate(['/profile', 'view', id]) créer le component de vue unique ou rediriger vers profile?
  }

}
