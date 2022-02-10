import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-operaciones-cliente',
  templateUrl: './operaciones-cliente.component.html',
  styleUrls: ['./operaciones-cliente.component.css']
})
export class OperacionesClienteComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public cliente: any,
    public dialogRef: MatDialogRef<OperacionesClienteComponent>,
    private _clienteService: ClienteService) {
    this.form = this.fb.group({
      nomCli: ['', Validators.required],
      apeCli: ['', Validators.required],
      cedCli: ['', Validators.required],
      dirCli: ['', Validators.required],
      telCli: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.cliente != null) {
      this.form = this.fb.group({
        idCli: [this.cliente.idCli],
        nomCli: [this.cliente.nomCli],
        apeCli: [this.cliente.apeCli, Validators.required],
        cedCli: [this.cliente.cedCli, Validators.required],
        dirCli: [this.cliente.dirCli, Validators.required],
        telCli: [this.cliente.telCli, Validators.required]
      })
    }
  }
  guardar() {
    //inserción al BE en la DB
    const cliente = this.form.value
    if (this.cliente != null) {
      //update
      this._clienteService.updateCliente(this.cliente.idCli, cliente).subscribe(data => {
      })
    } else {
      //post
      this._clienteService.saveCliente(cliente).subscribe(data => {
      })
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
