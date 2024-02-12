import { Pipe, type PipeTransform } from '@angular/core';
import { Inventario } from '@interfaces/inventario.interface';

@Pipe({
  name: 'appInventarioByMes',
  standalone: true,
})
export class InventarioByMesPipe implements PipeTransform {

  transform(inventario: Inventario[], fecha: Date ): Inventario[] {

    console.log(inventario)
    return inventario.filter(
      (item) => new Date(item.fecha).getMonth() === new Date(fecha).getMonth()
    );
  }

}
