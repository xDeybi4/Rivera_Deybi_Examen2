import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  form: FormGroup;
  categorias: any;
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public producto: any,
    public dialogRef: MatDialogRef<NuevoProductoComponent>,
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService) {
    this.form = this.fb.group({
      nomPro: ['', Validators.required],
      stockPro: ['', Validators.required],
      puPro: ['', Validators.required],
      catPro: ['', Validators.required],
      imgPro: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarCategorias();
    if (this.producto != null) {
      this.form = this.fb.group({
        idPro: [this.producto.idPro],
        nomPro: [this.producto.nomPro, Validators.required],
        stockPro: [this.producto.stockPro, Validators.required],
        puPro: [this.producto.puPro, Validators.required],
        catPro: [this.producto.catPro, Validators.required],
        imgPro: [this.producto.imgPro, Validators.required]
      })
    }
  }
  guardar() {
    //inserción al BE en la DB
    const prod = this.form.value
    if (this.producto != null) {
      //update
      this._productoService.updateProducto(this.producto.idPro, prod).subscribe(data => {
      })
    } else {
      //post
      this._productoService.saveProducto(prod).subscribe(data => {
      })
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
  cargarCategorias() {
    this._categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    }, error => {
      console.log(error)
    })
  }
}
