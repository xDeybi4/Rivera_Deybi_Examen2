import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import { OperacionesUsuariosComponent } from './operaciones-usuarios/operaciones-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  columnas: string[] = ['ID', 'nombre', 'usuario', 'tipo', 'revisar'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    public snack: MatSnackBar,
    public dialogo: MatDialog,
    private router: Router) {
    if (this._loginService.UsuarioData.usuario.tipo == "C") {
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error)
    })
  }

  nuevoUsuario() {
    const ref = this.dialogo.open(OperacionesUsuariosComponent, {
      disableClose: true,
      autoFocus: true
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios();
        this.snack.open('Usuario agregado con éxito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'

        })
      }
    })
  }

  editarUsuario(usuario: any) {
    const ref = this.dialogo.open(OperacionesUsuariosComponent, {
      data: {usuario: usuario, editando: true},
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios();
        this.snack.open('Usuario editado con éxito', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

  eliminarUsuario(id: number) {
    const ref = this.dialogo.open(DialogoConfirmacionComponent, {
      disableClose: true,
      autoFocus: true
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this._usuarioService.deleteUsuario(id).subscribe(data => {
          this.snack.open('Usuario eliminado con éxito', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        this.cargarUsuarios();
        }, error => {
          console.log(error)
        })
      }
    })
  }
}
