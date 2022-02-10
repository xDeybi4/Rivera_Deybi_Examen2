import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = 'api/Usuarios/';
  constructor(private http : HttpClient) { }

  
  getUsuarios() : Observable<any>{
    return this.http.get(environment.urlGlobal+this.api)
  }
  saveUsuario(usuario : any) : Observable<any>{
    return this.http.post(environment.urlGlobal+this.api,usuario);
  }
  updateUsuario(id: number, usuario : any) : Observable<any>{
    return this.http.put(environment.urlGlobal+this.api+id,usuario)
  }
  deleteUsuario(id: number): Observable<any>{
    return this.http.delete(environment.urlGlobal+this.api+id);
  }
}

