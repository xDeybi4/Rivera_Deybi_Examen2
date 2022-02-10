import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosComponent } from './productos/productos.component';
import { VentaComponent } from './venta/venta.component';
import { NuevoProductoComponent } from './productos/nuevo-producto/nuevo-producto/nuevo-producto.component';
import { VistaFacturaComponent } from './inicio/vista-factura/vista-factura.component';
import { DialogoProductosComponent } from './venta/dialogo-productos/dialogo-productos.component';
import { ClienteComponent } from '../dashboard/cliente/cliente.component';
import { OperacionesClienteComponent } from '../dashboard/cliente/operaciones-cliente/operaciones-cliente/operaciones-cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OperacionesUsuariosComponent } from './usuarios/operaciones-usuarios/operaciones-usuarios.component';
import { DialogoImgProdutoComponent } from './venta/dialogo-productos/dialogo-img-produto/dialogo-img-produto.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    ProductosComponent,
    VentaComponent,
    NuevoProductoComponent,
    VistaFacturaComponent,
    DialogoProductosComponent,
    ClienteComponent,
    OperacionesClienteComponent,
    UsuariosComponent,
    OperacionesUsuariosComponent,
    DialogoImgProdutoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
