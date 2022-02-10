import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { Login } from '../interfaces/login';
import { environment } from 'src/environments/environment';

const httpOption = {
  headers : new HttpHeaders({
    'Content-Type':'application/JSON'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = 'api/Login/';

  private usuarioSubject!: BehaviorSubject<Auth>;


  
  constructor(private http : HttpClient) { 
  this.usuarioSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('auth')!))
  }
  
  public get UsuarioData(): Auth {
    return this.usuarioSubject.value;
  }

  autenticarUsuario(credenciales : Login) : Observable<Auth>{
    return this.http.post<Auth>(environment.urlGlobal+this.api,credenciales,httpOption).pipe(
      map(res=>{
        if(res.token != null){
          const auth : Auth = res
          localStorage.setItem('auth',JSON.stringify(auth))
          this.usuarioSubject.next(auth)
        }
        return res
      }))
    }

    logout(){
      localStorage.removeItem('auth')
      this.usuarioSubject.next(null!)
    }
}
