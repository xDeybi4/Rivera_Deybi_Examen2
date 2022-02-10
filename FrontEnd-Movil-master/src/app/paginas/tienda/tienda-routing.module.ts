import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaPage } from './tienda.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaPage
  },
  {path: 'productos/:id',loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaPageRoutingModule {}
