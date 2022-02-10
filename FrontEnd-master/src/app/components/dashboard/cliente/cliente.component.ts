import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { LoginService } from 'src/app/services/login.service';
import { OperacionesClienteComponent } from './operaciones-cliente/operaciones-cliente/operaciones-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  columnas: string[] = ['cedula', 'nombre', 'direccion', 'telefono', 'revisar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public data;
  constructor(
    private injector: Injector,
    private _clienteService: ClienteService,
    public dialogo: MatDialog,
    public snack: MatSnackBar,
    private _loginService: LoginService,
    private router: Router
  ) {
    if (this._loginService.UsuarioData.usuario.tipo == "C") {
      this.router.navigate(['/dashboard'])
    }
    this.data = this.injector.get(MAT_DIALOG_DATA, false);
  }

  ngOnInit(): void {
    this.cargarClientes();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarClientes() {
    this._clienteService.getClientes().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error)
    })
  }

  editarCliente(cliente: any) {
    const ref = this.dialogo.open(OperacionesClienteComponent, {
      data: cliente,
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.cargarClientes();
        this.snack.open('Cliente actualizado con éxito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

  nuevoCliente() {
    const ref = this.dialogo.open(OperacionesClienteComponent, {
      disableClose: true,
      autoFocus: true
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.cargarClientes();
        this.snack.open('Cliente agregado con éxito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }
}
