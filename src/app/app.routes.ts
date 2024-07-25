import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard/dashboard.component'),
        data: { titulo: 'precios' },
      },
      {
        path: 'precios',
        loadComponent: () => import('./pages/prices/prices.component'),
        data: { titulo: 'precios' },
      },
      {
        path: 'cuenta',
        data: { titulo: 'Cuentas' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/cuentas/listCuenta/listCuenta.component'),
            data: { titulo: 'Lista de productos' },
          },
          {
            path: 'registrar',
            loadComponent: () =>
              import('./pages/cuentas/formCuenta/formCuenta.component'),
            data: { titulo: 'Configurar producto' },
          },
          {
            path: 'balance',
            loadComponent: () =>
              import('./pages/cuentas/balanceCuentas/balanceCuentas.component'),
            data: { titulo: 'Balance cuentas' },
          },
        ],
      },
      {
        path: 'inventario',
        loadComponent: () => import('./pages/inventario/inventario.component'),
        data: { titulo: 'inventario' },
      },
      {
        path: 'productos',
        data: { titulo: 'Productos' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/productos/listProductos/listProductos.component'),
            data: { titulo: 'Lista de productos' },
          },
          {
            path: 'configurar',
            loadComponent: () =>
              import('./pages/productos/formProductos/formProductos.component'),
            data: { titulo: 'Configurar producto' },
          },
        ],
      },
      {
        path: 'insumos',
        loadComponent: () => import('./pages/insumos/insumos.component'),
        data: { titulo: 'insumos' },
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/clientes.component'),
        data: { titulo: 'clientes' },
      },
      {
        path: 'pedidos',
        data: { titulo: 'pedidos' },
        children: [
          {
            path: 'registrar',
            data: { titulo: 'Registro de pedido' },
            loadComponent: () =>
              import('./pages//pedidos/formPedidos/formPedidos.component'),
          },
          {
            path: '',
            data: { titulo: 'Lista de pedidos' },
            loadComponent: () =>
              import('./pages//pedidos/listPedidos/listPedidos.component'),
          },
        ],
      },
      {
        path: 'web',
        data: { titulo: 'web' },
        children: [
          {
            path: 'cms',
            data: { titulo: 'CMS' },
            loadComponent: () => import('./pages/cms/cms.component'),
          },
          {
            path: 'mensajes',
            data: { titulo: 'Lista de mensajes' },
            loadComponent: () => import('./pages/messages/messages.component'),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
