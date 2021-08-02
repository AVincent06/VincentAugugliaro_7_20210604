import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    // Controle de l'acces
    if(!this.authService.isConnected()) {
      console.log('accès non autorisé !')
      this.authService.signOutUser();
      this.router.navigate(['signin']);
      return false;
    }

    return true;
  }

}
