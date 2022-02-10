import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  cookie: any
  constructor(private _loginService: LoginService) {
    this.cookie = _loginService.UsuarioData;
   }

  ngOnInit() {
  }

  logout() {
    console.log("Ha salido");
    this._loginService.logout();
  }

}
