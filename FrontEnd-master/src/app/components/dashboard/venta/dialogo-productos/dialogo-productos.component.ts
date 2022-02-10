import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogoImgProdutoComponent } from './dialogo-img-produto/dialogo-img-produto.component';

@Component({
  selector: 'app-dialogo-productos',
  templateUrl: './dialogo-productos.component.html',
  styleUrls: ['./dialogo-productos.component.css']
})
export class DialogoProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new  MatTableDataSource();
  columnas : string [] = ["ID","nombre","categoria","stock","pu","acciones"]
  constructor(
    private _productoService : ProductoService,
    private dialogo : MatDialog
  ) { }

  ngOnInit(): void {
 this.cargarProductos();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  prueba(img : string){
    const ref = this.dialogo.open(DialogoImgProdutoComponent, {
      data: img
    })
    ref.afterClosed().subscribe(result => {
      
    })
    }
  cargarProductos(){
    this._productoService.getProductosConStock().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, error =>{
      console.log(error)
    });
  }
}
