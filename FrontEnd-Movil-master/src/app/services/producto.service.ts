import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api = 'api/ProductoControlador/categoria';

  constructor(private http: HttpClient) { }

  getProductos(idCategoria: any): Observable<any>{
    return this.http.post(environment.urlGlobal+this.api+"?idcategoria="+idCategoria,idCategoria);
  }
}
