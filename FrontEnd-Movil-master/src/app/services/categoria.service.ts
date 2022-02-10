import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api = 'api/CategoriaControlador/';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(environment.urlGlobal + this.api);
  }
}

