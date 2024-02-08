import { Pipe, type PipeTransform } from '@angular/core';
import { Pedido } from '@interfaces/pedido.interface';

@Pipe({
  name: 'pipePedidosByEstatus',
  standalone: true,
})
export class PedidosByEstatusPipe implements PipeTransform {

  transform( pedidos: Pedido[], estatus: string ): Pedido[] {

    switch (estatus) {
      case '':
          return pedidos;
      default:
        return pedidos.filter( ( pedido ) => pedido.estatus.desc ===  estatus );
    }
  }

}
