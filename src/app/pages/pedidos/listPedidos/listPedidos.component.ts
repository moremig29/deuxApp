import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '@interfaces/pedido.interface';

import { PedidosService } from '@services/pedidos.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PedidosByEstatusPipe } from '../../../pipes/pedidos-by-estatus.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { ListasService } from '@services/listas.service';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '@services/inventario.service';

@Component({
  selector: 'app-list-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    PedidosByEstatusPipe,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './listPedidos.component.html',
  styleUrl: './listPedidos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListPedidosComponent {
  estatus: string = 'Pendiente';
  constructor(
    public pedidosService: PedidosService,
    public listasService: ListasService,
    private inventarioService: InventarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pedidosService.getPedidos();
    this.inventarioService.getInventario();
  }

  editarPedido(pedido: Pedido) {
    this.pedidosService.pedido = pedido;
    this.router.navigateByUrl('/pedidos/registrar');
  }

  eliminarPedido(pedido: Pedido) {
    this.pedidosService.deletePedido(pedido.id).subscribe();
  }

  completarPedido(pedido: any) {
    // usar el metodo de editar y enviar el estatus con el valor 65b6a5df1769773db5c7bba1

    pedido.estatus = '65b6a5df1769773db5c7bba1';
    pedido.cliente = pedido.cliente._id;
    pedido.items.articulo = pedido.items.articulo._id;

    this.pedidosService.putPedido( pedido, pedido.id ).subscribe();


  }
}
