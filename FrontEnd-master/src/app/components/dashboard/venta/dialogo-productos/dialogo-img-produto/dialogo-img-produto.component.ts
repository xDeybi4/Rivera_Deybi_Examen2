import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperacionesClienteComponent } from '../../../cliente/operaciones-cliente/operaciones-cliente/operaciones-cliente.component';

@Component({
  selector: 'app-dialogo-img-produto',
  templateUrl: './dialogo-img-produto.component.html',
  styleUrls: ['./dialogo-img-produto.component.css']
})
export class DialogoImgProdutoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public imagen: any,
    public dialogRef: MatDialogRef<OperacionesClienteComponent>
  ) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.dialogRef.close();
  }
}
