import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private _loginService : LoginService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  if(this._loginService.UsuarioData){
      this.router.navigate(['/dashboard'])
   } 
  }

  ngOnInit(): void {
  }
  
  public ingresar() {
    const user = this.form.value.usuario;
    const password = this.form.value.password;
    const credenciales : Login = {
      usuario : user,
      contrasena : password
    }
    var correcto = null;
    this._loginService.autenticarUsuario(credenciales).subscribe(data => {
      correcto  = data
      if (correcto != null ) {
        this.fakeLoading();
      }
    }, error => {
      this.error(error.error.message)
      this.form.reset();
    })
    
  }
  error(mensaje : string) {
    this.snack.open(mensaje, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
