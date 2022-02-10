import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  abierto: boolean = false
  detalles: any[]
  id: any
  total: any
  listaFacturas: any[] = [];
  constructor(private _facturaService: FacturaService,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    const id = this._loginService.UsuarioData.usuario.idCli;
    this._facturaService.getCliente(id).subscribe(data => {
      this.listaFacturas = data
    });
  }
  abrirDetalle(objeto: any) {
    this.detalles = objeto.detalleFacturas
    this.id = objeto.idFact
    this.total = objeto.total
    if (this.abierto == true) {
      this.abierto = false
    } else {
      this.abierto = true
    }
  }
}
