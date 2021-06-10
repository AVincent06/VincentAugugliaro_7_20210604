import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string): boolean {
    return true;
  }

  signInUser(email: string, password: string): boolean {
    return true;
  }

  signOutUser(): boolean {
    return true;
  }

}
