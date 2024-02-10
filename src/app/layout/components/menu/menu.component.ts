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
            routerLink: ['/dashboard/precios'],
            badge: 'NEW',
          },
          {
            label: 'Inventario',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/dashboard/inventario'],
            badge: 'NEW',
          },
          {
            label: 'Cuenta',
            icon: 'pi pi-fw pi-dollar',
            items: [
              {
                label: 'Consolidado',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/dashboard/cuenta'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/dashboard/cuenta/registrar'],
              },
            ],
          },
          {
            label: 'Insumos',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/dashboard/insumos'],
            badge: 'NEW',
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-shopping-bag',
            items: [
              {
                label: 'Lista',
                icon: 'pi pi-fw pi-list',
                routerLink: ['/dashboard/productos'],
              },
              {
                label: 'Configurar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/dashboard/productos/configurar'],
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
                routerLink: ['/dashboard/pedidos'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/dashboard/pedidos/registrar'],
              },
            ],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/dashboard/clientes'],
            badge: 'NEW',
          },
        ],
      },
      {
        label: 'CMS',
        items: [
          {
            label: 'CMS',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Proximamente',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/dashboard/sm-1'],
              },
              /* {
                label: 'Registrar',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/sm-2'],
              }, */
            ],
          },
        ],
      },
    ];
  }
}
