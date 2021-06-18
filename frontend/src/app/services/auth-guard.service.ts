import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isUserLoggedIn().subscribe((isLog: boolean) => this.isLoggedIn = isLog); // code pour l'observable de la session
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    // Controle de l'acces
    if(!this.isLoggedIn) {
      console.log('accès non autorisé !')
      this.router.navigate(['signin']);
      return false;
    }

    return true;
  }

}
