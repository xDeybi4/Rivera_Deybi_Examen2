import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { LoginService } from 'src/app/services/login.service';
import { ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  focused: boolean; //para el imput
  photos: [];
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private _clienteService: ClienteService,
    private router: Router,
    public toastController: ToastController
  ) {
    this.form = this.fb.group({
      nomCli: ['', Validators.required],
      apeCli: ['', Validators.required],
      dirCli: ['', Validators.required],
      telCli: ['', Validators.required],
      cedCli: ['', Validators.required],
      contrasena: ['', Validators.required],
      corCli: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onBlur(event: any) {
    const value = event.target.value;
    if (!value) {
      this.focused = false;
    }
  }

  onBlurCorreo(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
      return;
    }
    this._clienteService.getCliente(this.form.value.corCli).subscribe(data => {
      this.llenarCamposAuto(data);
    }, error => {
      //this.resetCamposAuto();
    }
    )
  }



  llenarCamposAuto(data: any) {
    this.form.patchValue({
      nomCli: data.nomCli,
      apeCli: data.apeCli,
      dirCli: data.dirCli,
      telCli: data.telCli,
      cedCli: data.cedCli
    })
  }

  resetCamposAuto() {
    this.form.patchValue({
      nomCli: "",
      apeCli: "",
      dirCli: "",
      telCli: "",
      cedCli: ""
    })
  }



  async guardar() {

    const cliente: any = {
      nomCli: this.form.value.nomCli,
      apeCli: this.form.value.apeCli,
      dirCli: this.form.value.dirCli,
      telCli: this.form.value.telCli,
      corCli: this.form.value.corCli,
      cedCli: this.form.value.cedCli,
      contrasena: this.form.value.contrasena
    };

    if (!this.validar()) {
      const toast = await this.toastController.create({
        message: "Cédula ingresada no válida.",
        duration: 2000
      });
      toast.present();
      return;
    }

    this._clienteService.saveCliente(cliente)
      .subscribe(async data => {
        const toast = await this.toastController.create({
          message: "Su cuenta se ha creado exitosamente",
          duration: 2000
        });
        toast.present();
        this.router.navigate(['/login'])
      }, async error => {
        const toast = await this.toastController.create({
          message: error.error.message,
          duration: 2000
        });
        toast.present();
      })

  }

  validar() {
    var ced: any = this.form.value.cedCli
    var total = 0;
    var longitud = ced.length;
    var longcheck = longitud - 1;

    if (ced !== "" && longitud === 10) {
      for (var i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = ced.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(ced.charAt(i));
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      if (ced.charAt(longitud - 1) == total) {
        return true;
      } else {
        return false;
      }
    }
  }

}
