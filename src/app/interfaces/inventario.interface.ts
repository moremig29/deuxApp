import { Categoria } from "./categoria.interface";

export interface Inventario {
  categoria: Categoria;
  concepto: string;
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
