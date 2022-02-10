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
      contrasena: ['', Validators.required]
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
  onBlurCedula(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
      return;
    }
    this._clienteService.getCliente(this.form.value.cedCli).subscribe(data => {
      this.llenarCamposAuto(data);
    }, error => {
      this.resetCamposAuto();
    }
    )
  }

  llenarCamposAuto(data: any) {
    this.form.patchValue({
      nomCli: data.nomCli,
      apeCli: data.apeCli,
      dirCli: data.dirCli,
      telCli: data.telCli
    })
  }

  resetCamposAuto() {
    this.form.patchValue({
      nomCli: "",
      apeCli: "",
      dirCli: "",
      telCli:""
    })
  }



  guardar() {

    const cliente: any = {
      //idCli: this.form.get('idCli')?.value,
      nomCli: this.form.value.nomCli,
      apeCli: this.form.value.apeCli,
      dirCli: this.form.value.dirCli,
      telCli: this.form.value.telCli,
      cedCli: this.form.value.cedCli,
      contrasena: this.form.value.contrasena,
    };

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
          message: "Hubo un problema",
          duration: 2000
        });
        toast.present();
      })

  }

}
