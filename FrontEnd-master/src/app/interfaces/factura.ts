import { Detalle } from "./detalle";

export interface Factura {
  total: number
  idCli: number
  idCliNavigation : any
  detalleFacturas: Detalle[]
}

export interface Vista_Factura { 
  id : number,
  cedula : string,
  cliente : string,
  fecha : Date,
  total : number
}