import { Producto } from "./producto";

export interface Detalle {
    idPro: number
    cant: number
    pu: number
    idProNavigation: Producto
}