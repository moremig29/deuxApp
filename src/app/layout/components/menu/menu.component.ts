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
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'Productos',
        items: [
          {
            label: 'Precios',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/precios'],
            badge: 'NEW',
          },
          {
            label: 'Cuenta',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Consolidado',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/cuenta'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/cuenta/registrar'],
              },
            ],
          },
          {
            label: 'Inventario',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/inventario'],
            badge: 'NEW',
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Lista',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/productos'],
              },
              {
                label: 'Configurar',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/productos/configurar'],
              },
            ],
          },
          {
            label: 'Insumos',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/insumos'],
            badge: 'NEW',
          },
          {
            label: 'Pedidos',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Lista',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/pedidos'],
              },
              {
                label: 'Registrar',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/pedidos/registrar'],
              },
            ],
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/clientes'],
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
                routerLink: ['/sm-1'],
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
