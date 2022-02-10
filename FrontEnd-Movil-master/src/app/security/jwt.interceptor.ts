import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuario = this._loginService.UsuarioData
    
    if (usuario) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${usuario.token}`
        }
      })
    }
    return next.handle(request);
  }
}
