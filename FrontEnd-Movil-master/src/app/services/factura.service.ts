import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../interfaces/factura';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private api = 'api/FacturaControlador/';

  constructor(private http: HttpClient) { }

  getCliente(idCli: any): Observable<any> {
    return this.http.post(environment.urlGlobal + this.api+"cliente" + "?idCliente=" + idCli, idCli);
  }

  postFactura(factura: Factura): Observable<any> {
    return this.http.post(environment.urlGlobal + this.api, factura)
  }

}
