import { Categoria } from "./categoria.interface";
import { Insumo } from "./insumo.interface";

export interface Inventario {
  insumo: Insumo;
  fecha: Date;
  inicial: number;
  ventas: number;
  compras: number;
  final: number;
  id?: string;
}

export interface InventarioSignal {
  loading: boolean,
  inventario: Inventario[]
}
