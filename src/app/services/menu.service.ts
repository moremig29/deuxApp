import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menu: any[] = [
    {
      titulo: 'Precios',
      icono: 'bx bx-purchase-tag',
      url: 'precios',
    },
    {
      titulo: 'Cuenta',
      icono: 'bx bxs-bank',
      url: 'cuenta',
      children: [
        {
          titulo: 'Consolidado',
          url: '/',
        },
        {
          titulo: 'Registrar',
          url: '/registrar',
        },
      ],
    },
    {
      titulo: 'Inventario',
      icono: 'bx bx-table',
      url: 'inventario',
    },
    {
      titulo: 'Productos',
      icono: 'bx bx-coffee',
      url: 'productos',
      children: [
        {
          titulo: 'Lista',
          url: '/',
        },
        {
          titulo: 'Configurar',
          url: '/configurar',
        },
      ],
    },
    {
      titulo: 'Insumos',
      icono: 'bx bx-list-check',
      url: 'insumos',
    },
    {
      titulo: 'Pedidos',
      icono: 'bx bx-package',
      url: 'pedidos',
      children: [
        {
          titulo: 'Registro',
          url: '/registro',
        },
        {
          titulo: 'lista',
          url: '/',
        },
      ],
    },
    {
      titulo: 'Clientes',
      icono: 'bx bxs-user-detail',
      url: 'clientes',
    },
  ];

}
