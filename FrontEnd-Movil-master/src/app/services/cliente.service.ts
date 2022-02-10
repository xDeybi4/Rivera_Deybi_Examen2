import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private api = 'api/RegistroControlador/';


  constructor(private http: HttpClient) { }

  getCliente(cedula: any): Observable<any>{
    return this.http.get(environment.urlGlobal+this.api+cedula);
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(environment.urlGlobal + this.api,cliente);
  }
}
