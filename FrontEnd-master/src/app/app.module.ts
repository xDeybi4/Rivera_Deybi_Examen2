import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './security/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogoConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
