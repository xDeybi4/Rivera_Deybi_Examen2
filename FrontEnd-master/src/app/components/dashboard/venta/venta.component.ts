import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Detalle } from 'src/app/interfaces/detalle';
import { Factura } from 'src/app/interfaces/factura';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteComponent } from '../../dashboard/cliente/cliente.component';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoProductosComponent } from './dialogo-productos/dialogo-productos.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit {
  public detalles!: any;
  public total !: any;
  public subtotales !: any;
  public cliente !: any;
  public producto !: any;
  public stock : any;
  public indexPrueba !: number;
  public dataSource: any;
  public longitud = 0;
  public editando: boolean = false;
  public mostrarDatos: boolean = false;
  public form = this.formBuilder.group({
    idCliente: ['', Validators.required],
    idProducto: ['', Validators.required],
    cantidad: ['', Validators.required]
  });
  columnas: string[] = ['idProducto', 'cantidad', 'importe', 'acciones'];
  constructor(
    public snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _facturaService: FacturaService,
    public dialogo: MatDialog
  ) {
    this.detalles = [];
    this.subtotales = [];
    this.stock = 0
  }
  ngOnInit(): void {
  }
  buscarCliente() {
    const ref = this.dialogo.open(ClienteComponent, {
      data: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (this.form.value.idProducto == '') {
        this.form = this.formBuilder.group({
          idCliente: [result, Validators.required],
          idProducto: ['', Validators.required],
          cantidad: ['', Validators.required]
        })
      } else {
        this.form = this.formBuilder.group({
          idCliente: [result, Validators.required],
          idProducto: [this.producto.idPro, Validators.required],
          cantidad: ['', Validators.required]
        })
      }
      const id = result
      if (id == null || id == 0) {
        this.cliente = null
        this.cargarDatosCliente(this.cliente);
        return
      }
      this._clienteService.getCliente(id).subscribe(data => {
        this.cliente = data
        this.cargarDatosCliente(this.cliente);
      }, error => {
        this.snackbar.open('El cliente no existe', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.cliente = null
        this.cargarDatosCliente(this.cliente);
      })
    })
  }
  cargarDatosCliente(objeto: any) {
    if (objeto == null) {
      this.mostrarDatos = false
      return
    }
    this.mostrarDatos = true
  }
  buscarProducto() {
    const ref = this.dialogo.open(DialogoProductosComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (this.form.value.idCliente == '') {
        this.form = this.formBuilder.group({
          idCliente: ['', Validators.required],
          idProducto: [result, Validators.required],
          cantidad: ['', Validators.required]
        })
      } else {
        this.form = this.formBuilder.group({
          idCliente: [this.cliente.idCli, Validators.required],
          idProducto: [result, Validators.required],
          cantidad: ['', Validators.required]
        })
      }
      const id = result
      if (id == null || id == 0) {
        this.producto = null
        return
      }
      this._productoService.getProducto(id).subscribe(data => {
        this.producto = data
        this.stock = data.stockPro
      }, error => {
        console.log(error)
        this.producto = null
      })
    })
  }

  addConcepto() {
    this.stock = 0
    if (this.form.value.cantidad == 0)
      return

    for (let numero in this.detalles) {
      if (this.detalles[numero].idPro == this.producto.idPro && !this.editando) {
        this.snackbar.open('El producto ya se encuentra en el carrito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.form = this.formBuilder.group({
          idCliente: [this.cliente.idCli, Validators.required],
          idProducto: ['', Validators.required],
          cantidad: ['', Validators.required]
        })
        return
      }
    }
    const detalle: Detalle = {
      idPro: this.producto.idPro,
      cant: this.form.value.cantidad,
      pu: this.producto.puPro,
      idProNavigation: this.producto
    }
    if (detalle.cant > detalle.idProNavigation.stockPro) {
      this.snackbar.open('Solo hay ' + detalle.idProNavigation.stockPro + ' ' + detalle.idProNavigation.nomPro + ' en stock', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      return
    }
    if (this.editando) {
      this.detalles.splice(this.indexPrueba, 1);
      this.subtotales.splice(this.indexPrueba, 1);
    }
    this.subtotales.push(detalle.cant * detalle.pu)
    this.detalles.push(detalle)
    this.dataSource = new MatTableDataSource(this.detalles);
    this.longitud = this.dataSource._renderData._value.length;
    this.form = this.formBuilder.group({
      idCliente: [this.cliente.idCli, Validators.required],
      idProducto: ['', Validators.required],
      cantidad: ['', Validators.required]
    })
    this.total = this.subtotales.reduce((a: any, b: any) => a + b, 0);
    this.editando = false;
  }
  cancelar() {
    this.router.navigate(['dashboard'])
  }
  editar(objeto: any, index: number) {
    this.stock = objeto.idProNavigation.stockPro
    this.form = this.formBuilder.group({
      idCliente: [this.cliente.idCli, Validators.required],
      idProducto: [objeto.idPro, Validators.required],
      cantidad: [objeto.cant, Validators.required]
    })
    this.producto = objeto.idProNavigation;
    
    this.editando = true;
    this.indexPrueba = index
  }
  eliminar(index: number) {
    this.detalles.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.detalles);
    this.longitud = this.dataSource._renderData._value.length;
    this.subtotales.splice(index, 1);
    this.total = this.subtotales.reduce((a: any, b: any) => a + b, 0);
  }
  guardarFactura() {
    this.total = this.subtotales.reduce((a: any, b: any) => a + b, 0);
    const factura: Factura = {
      total: this.total,
      idCli: this.cliente.idCli,
      idCliNavigation: this.cliente,
      detalleFacturas: this.detalles
    }
    const ref = this.dialogo.open(DialogoConfirmacionComponent, {
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this._facturaService.postFactura(factura).subscribe(data => {
          this.snackbar.open('Venta finalizada exitósamente', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }, error => {
          this.snackbar.open('Hubo un error al realizar la venta', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        })
        this.router.navigate(['dashboard'])
      }
    })
  }
} 
