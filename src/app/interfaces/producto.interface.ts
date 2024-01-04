export interface Producto {
  nombre: string,
  insumos: string[],
  costo_total: number,
  precio_venta: number,
  img: string;
  rating: number;
  id?: string
  _id?: string
}

export interface ProductoSignal {
  productos: Producto[],
  loading: boolean
}
