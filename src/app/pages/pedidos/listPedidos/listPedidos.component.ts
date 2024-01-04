import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PedidosService } from '@services/pedidos.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './listPedidos.component.html',
  styleUrl: './listPedidos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListPedidosComponent {

  constructor(
    public pedidosService: PedidosService
  ){}

  editarProducto(pedido: any) { }
  eliminarProducto(pedido: any) { }
}
