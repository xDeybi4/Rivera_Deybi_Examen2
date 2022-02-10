import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto/nuevo-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  columnas: string[] = ['ID', 'nombre', 'categoria', 'stock', 'pu', 'revisar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialogo: MatDialog,
    public snack: MatSnackBar,
    private _productoService: ProductoService,
    private _loginService: LoginService,
    private router: Router) {
    if (this._loginService.UsuarioData.usuario.tipo == "C") {
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
    this.cargarProductos();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarProductos() {
    this._productoService.getProductos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error)
    })
  }

  nuevoProd() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    const ref = this.dialogo.open(NuevoProductoComponent, config);
    ref.afterClosed().subscribe(result => {
      this.cargarProductos()
      if (result) {
        this.snack.open('Producto agregado con éxito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

  editarProd(producto: any) {
    const ref = this.dialogo.open(NuevoProductoComponent, {
      data: producto,
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.cargarProductos()
        this.snack.open('Producto editado con éxito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }
  eliminarProd(id: number) {
    const ref = this.dialogo.open(DialogoConfirmacionComponent, {
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this._productoService.updateEstadoProducto(id).subscribe(data => {
          this.snack.open('Producto eliminado con éxito', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.cargarProductos();
        }, error => {
          console.log(error)
        })
      }
    })

  }
}
