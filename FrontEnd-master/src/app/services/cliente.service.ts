import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private api = 'api/ClienteControlador/';
  constructor(private http : HttpClient) { }
  
  getCliente(id: number) : Observable<any>{
    return this.http.get(environment.urlGlobal+this.api+id)
  }
  getClientes(): Observable<any>{
    return this.http.get(environment.urlGlobal+this.api)
  }
  saveCliente(cliente : any): Observable<any>{
    return this.http.post(environment.urlGlobal+this.api,cliente)
  }
  updateCliente(id: number, cliente : any) : Observable<any>{
    return this.http.put(environment.urlGlobal+this.api+id, cliente)
  }
}
