import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Profile, Profile_private, Profile_public, Profile_public2 } from '../models/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profiles: Profile[] = [];
  profilesSubject = new Subject<Profile[]>();

  profile!: Profile;
  profileSubject = new Subject<Profile>();

  constructor( private http: HttpClient, private authService: AuthService ) { }

  emitProfiles(): void {
    this.profilesSubject.next(this.profiles); // en attendant le back avec le retour de l api
  }

  emitSingleProfile(): void {
    this.profileSubject.next(this.profile); // en attendant le back avec le retour de l api
  }

  getProfiles(): Observable<Profile_public[]> {
    return this.http.get<Profile_public[]>(
      'http://localhost:8080/api/users',  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }

  getSingleProfile(id: number): Observable<Profile_private> {
    return this.http.get<Profile_private>(
      'http://localhost:8080/api/users/'+id,  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }

  setSingleProfile(id: number, profile: Profile_public2): Observable<any> {
    return this.http.put(
      'http://localhost:8080/api/users/'+id,
      profile,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
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
    this.emitProfiles();
  }
}
