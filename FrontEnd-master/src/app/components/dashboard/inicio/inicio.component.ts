import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vista_Factura } from 'src/app/interfaces/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  vista: Vista_Factura[] = []
  factura: any;
  lstFacturas : any[] = [];
  expandir: boolean = false;
  columnas: string[] = ['ID', 'cedula', 'cliente', 'fecha', 'total', 'revisar'];
  dataSource = new MatTableDataSource<Vista_Factura>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _facturaService: FacturaService) {
    this.factura = {
      idFact: 0,
      fecFact: "",
      total: 0,
      idCli: 0,
      idCliNavigation: {
        idCli: 0,
        nomCli: "",
        apeCli: "",
        dirCli: "",
        telCli: "",
        facturas: [
          {
            idFact: 0,
            fecFact: "",
            total: 0,
            idCli: 0
          }
        ]
      },
      detalleFacturas: [
        {
          idDet: 0,
          idFactPer: 0,
          idPro: 0,
          cant: 0,
          pu: 0
        },
        {
          idDet: 0,
          idFactPer: 0,
          idPro: 0,
          cant: 0,
          pu: 0
        }
      ]
    }
  }
  ngOnInit(): void {
    this.cargarFacturas();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarFacturas() {
    this._facturaService.getFacturas().subscribe(data => {
      //asignacion a la vista factura para mejor manejo del filtro
      this.lstFacturas = data      
    console.log(this.lstFacturas)

      for (let index in data) {
        this.vista.push({
          id: data[index].idFact,
          cedula: data[index].idCliNavigation.cedCli,
          cliente: data[index].idCliNavigation.nomCli + " " + data[index].idCliNavigation.apeCli,
          fecha: data[index].fecFact,
          total: data[index].total
        })
      }
      this.dataSource = new MatTableDataSource<Vista_Factura>(this.vista);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error)
    })
  }
  verFactura(idFactura: number) {
    //de la data sacar el elemento que tenga esa id
    this.factura = this.lstFacturas.find(element => element.idFact == idFactura);
    this.expandir = true;
  }
}
