import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../interfaces/factura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
private api = 'api/FacturaControlador/';
  constructor(private http : HttpClient) { }

  getFacturas(): Observable<any>{
   return this.http.get(environment.urlGlobal+this.api);
  }
  postFactura(factura : Factura): Observable<any>{
   return this.http.post(environment.urlGlobal+this.api,factura)
  }
}
