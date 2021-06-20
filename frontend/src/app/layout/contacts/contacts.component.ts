import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  profiles: Profile[] = [];
  profilesSubscription = new Subscription();

  constructor(private profilesService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.profilesSubscription = this.profilesService.profilesSubject.subscribe(
      (profiles: Profile[]) => {
        this.profiles = profiles;
      }
    );
    this.profilesService.getProfiles();
    this.profilesService.emitProfiles();
  }

  onViewProfile(id: number) {
    // this.router.navigate(['/profile', 'view', id]) créer le component de vue unique ou rediriger vers profile?
  }

}
