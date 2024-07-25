import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { MenuitemComponent } from './menuitem.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MenuitemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  model: any[] = [];

  constructor(public layoutService: LayoutService ) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/app/dashboard'],
          },
        ],
      },
      {
        label: 'Productos',
        items: [
          {
            label: 'Precios',
            icon: 'pi pi-fw pi-tag',
            routerLink: ['/app/precios'],
            badge: 'NEW',
          },
          {
            label: 'Inventario',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/app/inventario'],
            badge: 'NEW',
          },
          {
            label: 'Cuenta',
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Consolidado',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/app/cuenta'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: ['/app/cuenta/registrar'],
              },
              {
                label: 'Balance',
                icon: 'pi pi-fw pi-chart-pie',
                routerLink: ['/app/cuenta/balance'],
              },
            ],
          },
          {
            label: 'Insumos',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/app/insumos'],
            badge: 'NEW',
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-shopping-bag',
            items: [
              {
                label: 'Lista',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/app/productos'],
              },
              {
                label: 'Configurar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/app/productos/configurar'],
              },
            ],
          },
          {
            label: 'Pedidos',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
              {
                label: 'Lista',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/app/pedidos'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/app/pedidos/registrar'],
              },
            ],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/app/clientes'],
            badge: 'NEW',
          },
        ],
      },
      {
        label: 'WEB',
        items: [
          {
            label: 'CMS',
            icon: 'pi pi-fw pi-cog',
            items: [
              {
                label: 'cms',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/app/web/cms'],
              },
              /* {
                label: 'Registrar',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/sm-2'],
              }, */
            ],
          },
          {
            label: 'Mensajes',
            icon: 'pi pi-fw pi-inbox',
            routerLink: ['/app/web/mensajes'],
            badge: 'NEW',
          },
        ],
      },
    ];
  }
}
