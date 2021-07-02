import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profiles: Profile[] = [];
  profilesSubject = new Subject<Profile[]>();

  profile!: Profile;
  profileSubject = new Subject<Profile>();

  constructor() { }

  emitProfiles(): void {
    this.profilesSubject.next(this.profiles); // en attendant le back avec le retour de l api
  }

  emitSingleProfile(): void {
    this.profileSubject.next(this.profile); // en attendant le back avec le retour de l api
  }

  saveProfiles(): void {
    // sauvegarde de this.profiles dans la BDD via l'API
  }

  getProfiles(): void {
    // chargement des données dans this.profiles via l'API
    this.profiles = [
      {
        id: 1,
        email: 'test@test.com',
        password : 'test',
        photo : 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        nom: 'defamille',
        prenom: 'toto',
        bio: 'toute ma vie en quelques lignes',
        is_admin: false
      },
      {
        id: 2,
        email: 'test1@test.com',
        password : 'test1',
        photo : '../../assets/images/profile.png',
        nom: 'defamille1',
        prenom: 'toto1',
        bio: 'toute ma vie en quelques lignes1',
        is_admin: true
      },
      {
        id: 3,
        email: 'test2@test.com',
        password : 'test2',
        photo : 'https://material.angular.io/assets/img/examples/shiba1.jpg',
        nom: 'defamille2',
        prenom: 'toto2',
        bio: 'toute ma vie en quelques lignes2',
        is_admin: false
      }
    ];

    this.emitProfiles();
  }

  getSingleProfile(id: number): Observable<Profile> {
    // chargement des données du profile ciblé via l'API
    this.profile = 
      {
        id: 2,
        email: 'test1@test.com',
        password : 'test1',
        photo : '../../assets/images/profile.png',
        nom: 'defamille1',
        prenom: 'toto1',
        bio: 'toute ma vie en quelques lignes1',
        is_admin: true
      };

    return of(this.profile);
  }

  createNewProfile(newProfile: Profile) {
    this.profiles.push(newProfile);
    this.saveProfiles();
    this.emitProfiles();
  }

  removeProfile(profile: Profile): void {
    const profileIndexToRemove = this.profiles.findIndex(
      (profileElement) => {
        if(profileElement === profile) {
          return true;
        }
        return false;
      }
    );
    this.profiles.splice(profileIndexToRemove, 1);
    this.saveProfiles();
    this.emitProfiles();
  }
}
