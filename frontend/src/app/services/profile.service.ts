import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profiles: Profile[] = [];
  profilesSubject = new Subject<Profile[]>();

  constructor() { }

  emitProfiles(): void {
    this.profilesSubject.next(this.profiles);
  }

  saveProfiles(): void {
    // sauvegarde de this.profiles dans la BDD via l'API
  }

  getProfiles(): void {
    // chargement des données dans this.profiles via l'API
    this.profiles = [
      {
        email: 'test@test.com',
        password : 'test',
        photo : 'maphoto.jpg',
        nom: 'defamille',
        prenom: 'toto',
        bio: 'toute ma vie en quelques lignes'
      },
      {
        email: 'test1@test.com',
        password : 'test1',
        photo : 'maphoto1.jpg',
        nom: 'defamille1',
        prenom: 'toto1',
        bio: 'toute ma vie en quelques lignes1'
      },
      {
        email: 'test2@test.com',
        password : 'test2',
        photo : 'maphoto2.jpg',
        nom: 'defamille2',
        prenom: 'toto2',
        bio: 'toute ma vie en quelques lignes2'
      }
    ];

    this.emitProfiles();
  }

  getSingleProfile(id: number): Observable<Profile> {
    // chargement des données du profile ciblé via l'API
    this.profiles = [
      {
        email: 'test@test.com',
        password : 'test',
        photo : 'maphoto.jpg',
        nom: 'defamille',
        prenom: 'toto',
        bio: 'toute ma vie en quelques lignes'
      },
      {
        email: 'test1@test.com',
        password : 'test1',
        photo : 'maphoto1.jpg',
        nom: 'defamille1',
        prenom: 'toto1',
        bio: 'toute ma vie en quelques lignes1'
      },
      {
        email: 'test2@test.com',
        password : 'test2',
        photo : 'maphoto2.jpg',
        nom: 'defamille2',
        prenom: 'toto2',
        bio: 'toute ma vie en quelques lignes2'
      }
    ];

    return of(this.profiles[id]);
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
