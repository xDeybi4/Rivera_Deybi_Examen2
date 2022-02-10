import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-operaciones-usuarios',
  templateUrl: './operaciones-usuarios.component.html',
  styleUrls: ['./operaciones-usuarios.component.css']
})
export class OperacionesUsuariosComponent implements OnInit {
  tipos = [{ id: 'A', nombre: 'Administrador' }, { id: 'C', nombre: 'Cajero' }]
  editando = false
  form: FormGroup;
  categorias: any;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OperacionesUsuariosComponent>,
    private _usuarioService: UsuarioService,
    public snack: MatSnackBar,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      usuario1: ['', Validators.required],
      tipo: ['', Validators.required],
      password: ['', Validators.required],
      passwordC: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.editando = this.data.editando
      this.form = this.fb.group({
        id: [this.data.usuario.id],
        nombre: [this.data.usuario.nombre, Validators.required],
        usuario1: [this.data.usuario.usuario1, Validators.required],
        tipo: [this.data.usuario.tipo, Validators.required],
        password: [''],
        passwordC: ['']
      })
    }
  }
  guardar() {
    //inserción al BE en la DB
    if(!this.editando){
      if (this.form.value.password != this.form.value.passwordC) {
        this.snack.open('Contraseñas no coinciden', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        return;
      }
    }
    const user: any = {
      nombre: this.form.value.nombre,
      usuario1: this.form.value.usuario1,
      tipo: this.form.value.tipo,
      password: this.form.value.password
    }

    if (this.data != null) {
      //update.
      user.id = this.data.usuario.id;
      this._usuarioService.updateUsuario(user.id, user).subscribe(data => {
      })
    } else {
      //post
      this._usuarioService.saveUsuario(user).subscribe(data => {
      })
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
}
