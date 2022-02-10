import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

//Manera de la que está la parte web
// const routes: Routes = [
//   {path: '', redirectTo: 'login',pathMatch: 'full'},
//   {path: 'login', loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)},
//   {path: 'carrito',loadChildren: () => import('./paginas/carrito/carrito.module').then( m => m.CarritoPageModule)},
//   {path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then( m => m.DashboardPageModule)},
//   {path:'**',redirectTo:'login',pathMatch:'full'},

// ];

//Si se hace de esta manera, se pone condicion en el dashboard para que no entre
const routes: Routes = [
  
  { path: '', canActivate: [AuthGuard],loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  { path: 'dashboard', canActivate: [AuthGuard],loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  { path: 'carrito', canActivate: [AuthGuard], loadChildren: () => import('./paginas/carrito/carrito.module').then(m => m.CarritoPageModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterPageModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
