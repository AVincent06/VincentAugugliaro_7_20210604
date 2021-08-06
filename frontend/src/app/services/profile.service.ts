import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile_private, Profile_public, Profile_public2 } from '../models/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getProfiles(): Observable<Profile_public[]> {
    return this.http.get<Profile_public[]>(
      `${environment.URL_BACKEND}/api/users`,  
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
      `${environment.URL_BACKEND}/api/users/${id}`,  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }

  setSingleProfile(id: number, profile: Profile_public2): Observable<any> {

    // Adoption d'un FormData pour résoudre un problème d'upload de fichier
    let formData = new FormData();
    formData.append('firstname', profile.firstname as string);
    formData.append('name', profile.name as string);
    formData.append('email', profile.email as string);
    formData.append('bio', profile.bio as string);
    formData.append('photo', profile.photo as string);
    formData.append('file', profile.file as File);

    return this.http.put(
      `${environment.URL_BACKEND}/api/users/${id}`,
      formData,
      { 
        headers: new HttpHeaders({
          //'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  delSingleProfile(id: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/users/${id}`,  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }
}
