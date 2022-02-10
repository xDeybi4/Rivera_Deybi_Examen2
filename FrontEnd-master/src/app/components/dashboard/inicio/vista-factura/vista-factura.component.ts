import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-factura',
  templateUrl: './vista-factura.component.html',
  styleUrls: ['./vista-factura.component.css']
})
export class VistaFacturaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'cant', 'pu', 'subtotal'];
  @Input() factura : any;
  constructor() { }

  ngOnInit(): void {
  }
  
}
