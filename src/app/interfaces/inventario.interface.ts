import { Producto } from "./producto.interface";

export interface Inventario {
  articulo: string;
  producto: Producto;
  cantidad: number;
  fecha_compra: Date;
  id? : string;
}

export interface InventarioSignal {
  loading: boolean,
  inventario: Inventario[]
}
