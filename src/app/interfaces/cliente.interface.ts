export interface Cliente {
  nombre: string;
  telefono: string;
  email: string;
  id?: string;
}

export interface ClienteSignal {
  loading: boolean,
  clientes: Cliente[]
}
