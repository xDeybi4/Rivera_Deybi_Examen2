import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  focused: boolean; //para el imput
  photos: [];
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
    if (this._loginService.UsuarioData) {
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit() {
    
  }

  onBlur(event: any) {
    const value = event.target.value;
    if (!value) {
      this.focused = false;
    }
  }

  ingresar() {
    const user = this.form.value.usuario;
    const password = this.form.value.password;
    const credenciales: Login = {
      usuario: user,
      contrasena: password
    }
    var correcto = null;

    this._loginService.autenticarUsuario(credenciales)
      .subscribe(data => {
        correcto = data;
        if (correcto != null) {
          this.router.navigate(['/dashboard']);          
        }
      }, async error => {
        const toast = await this.toastController.create({
          message: error.error.message,
          duration: 2000
        });
        toast.present();
      })
  
  }

}
