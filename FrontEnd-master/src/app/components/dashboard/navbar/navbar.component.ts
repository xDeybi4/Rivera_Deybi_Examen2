import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cookie: any
  esAdmin: boolean = true;
  esUser: boolean = false;
  constructor(private _loginService: LoginService) {
    this.cookie = _loginService.UsuarioData;
  }

  ngOnInit(): void {
    if (this.cookie.usuario.tipo == "C") {
      this.esUser = true;
    }
  }

  logout() {
    this._loginService.logout()
  }
}
