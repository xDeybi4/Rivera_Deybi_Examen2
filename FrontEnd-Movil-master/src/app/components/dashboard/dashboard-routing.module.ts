import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarritoPage } from 'src/app/paginas/carrito/carrito.page';

import { ComprasPage } from 'src/app/paginas/compras/compras.page';
import { PerfilPage } from 'src/app/paginas/perfil/perfil.page';
import { TiendaPage } from 'src/app/paginas/tienda/tienda.page';

import { DashboardPage } from './dashboard.page';

//Manera de la que está la parte web

// const routes: Routes = [
//   {
//     path: '', component: DashboardPage, children: [
//       { path: '', component: TiendaPage },
//       {path:'compras', component:ComprasPage},
//       { path: 'tienda', component: TiendaPage },
//       { path: 'perfil', component: PerfilPage },
//       //{ path: 'carrito', component: CarritoPage },

//     ]
//   }
// ];
const routes: Routes = [
  {
    path: 'dashboard', component: DashboardPage, children: [
      { path: 'compras', loadChildren: () => import('src/app/paginas/compras/compras.module').then(m => m.ComprasPageModule) },
      { path: 'tienda', loadChildren: () => import('src/app/paginas/tienda/tienda.module').then(m => m.TiendaPageModule) },
      { path: 'perfil', loadChildren: () => import('src/app/paginas/perfil/perfil.module').then(m => m.PerfilPageModule) },
      { path: '', redirectTo: '/dashboard/tienda', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/tienda',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
