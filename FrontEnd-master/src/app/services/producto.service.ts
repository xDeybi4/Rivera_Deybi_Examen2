import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api = 'api/ProductoControlador/';
  constructor(private http : HttpClient) { }

   getProductos(): Observable<any>{
    return this.http.get(environment.urlGlobal+this.api+"all");
   }

   getProductosConStock(): Observable<any>{
     return this.http.get(environment.urlGlobal+this.api+"many");
   }

   getProducto(id: number) : Observable<any>{
     return this.http.get(environment.urlGlobal+this.api+id)
   }

   deleteProducto(id : number):Observable<any>{
     return this.http.delete(environment.urlGlobal+this.api+id)
   }

   saveProducto(producto : any):Observable<any>{
    return this.http.post(environment.urlGlobal+this.api,producto)
   }

   updateProducto(id: number, producto : any) : Observable<any>{
     return this.http.put(environment.urlGlobal+this.api+id, producto)
   }

   updateEstadoProducto(id: number) : Observable<any>{
    return this.http.put(environment.urlGlobal+this.api+"?id="+id,id)
  }
}
