import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  listaCategorias: any[];

  constructor(private router: Router,
    private _apiCategorias: CategoriaService) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  abrirProductos(idCategoria: number) {
    this.router.navigate(['/dashboard/tienda/productos', idCategoria])
  }

  obtenerCategorias() {
    this._apiCategorias.getCategorias().subscribe(data => {
      this.listaCategorias = data;
    });
  }

}
