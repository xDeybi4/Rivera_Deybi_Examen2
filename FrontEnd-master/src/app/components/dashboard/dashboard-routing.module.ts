import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from '../dashboard/cliente/cliente.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {path:'',component:DashboardComponent, children:[
    {path:'',component:InicioComponent},
    {path:'ventas',component:VentaComponent},
    {path:'productos',component:ProductosComponent},
    {path:'clientes',component:ClienteComponent},
    {path:'usuarios',component:UsuariosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
