import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '@services/inventario.service';

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
    public pedidosService: PedidosService,
    private inventarioService: InventarioService,
    private router: Router
  ){}

  editarProducto(pedido: any) {
    this.pedidosService.pedido = pedido;
    this.router.navigateByUrl('/pedidos/registrar');
  }

  eliminarProducto(pedido: any) {

    console.log( pedido );
    this.pedidosService.deletePedido( pedido.id )
      .subscribe()
  }
}
