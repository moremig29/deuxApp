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
            routerLink: ['/dashboard'],
          },
        ],
      },
      {
        label: 'Productos',
        items: [
          {
            label: 'Precios',
            icon: 'pi pi-fw pi-tag',
            routerLink: ['/precios'],
            badge: 'NEW',
          },
          {
            label: 'Inventario',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/inventario'],
            badge: 'NEW',
          },
          {
            label: 'Cuenta',
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Consolidado',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/cuenta'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/cuenta/registrar'],
              },
            ],
          },
          {
            label: 'Insumos',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/insumos'],
            badge: 'NEW',
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-shopping-bag',
            items: [
              {
                label: 'Lista',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/productos'],
              },
              {
                label: 'Configurar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/productos/configurar'],
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
                routerLink: ['/pedidos'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/pedidos/registrar'],
              },
            ],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/clientes'],
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
                routerLink: ['/web/cms'],
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
            routerLink: ['/web/mensajes'],
            badge: 'NEW',
          },
        ],
      },
    ];
  }
}
