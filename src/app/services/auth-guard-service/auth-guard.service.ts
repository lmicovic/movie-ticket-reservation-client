import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthService) { 

  }

  //--------------------------------------------------------------------------------------------------
  // AuthGuard
  //--------------------------------------------------------------------------------------------------  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // If User is Logged in
    if(this.authService.isLoggedIn() === true) {
      return true;
    }
    
    // If User is not Logged in redirect to Login Page
    this.router.navigate(["/login"], {queryParams: { returnUrl: state.url }});
    return false;

  }
  //--------------------------------------------------------------------------------------------------
 
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(next, state);
}

