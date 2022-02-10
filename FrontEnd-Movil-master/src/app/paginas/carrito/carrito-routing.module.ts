import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoPage } from './carrito.page';

const routes: Routes = [
  {
    path: '',
    component: CarritoPage
  },
  {
    path: 'factura',
    loadChildren: () => import('./factura/factura.module').then( m => m.FacturaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoPageRoutingModule {}
