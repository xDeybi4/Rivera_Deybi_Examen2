import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
    private _loginService : LoginService){

  }

  canActivate(
    route: ActivatedRouteSnapshot) {
      const auth = this._loginService.UsuarioData;
      if(auth){
        return true;
      }
    this.router.navigate(['/login'])
    return false;
  }
  
}
