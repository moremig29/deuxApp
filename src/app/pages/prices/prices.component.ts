import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';

import { PricesService } from '@services/prices.service';
import { ListasService } from '@services/listas.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, ButtonModule, DataViewModule, DropdownModule, RatingModule, FormsModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricesComponent {

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  sortKey: any;
  layout: string = 'list';
  valorDolar: string = '';

  constructor(
    public pricesService: PricesService,
    public listasService: ListasService
  ) {
    this.sortOptions = [
      { label: 'Precio Mayor a Menor', value: '!producto.precio_venta' },
      { label: 'Precio Menor a Mayor', value: 'producto.precio_venta' },
    ];
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'info';
    }
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  upgradeTipoCambio() {

    if (this.valorDolar === '') return;
    this.listasService.postTipoCambio(this.valorDolar).subscribe((data) => {});
  }
}
