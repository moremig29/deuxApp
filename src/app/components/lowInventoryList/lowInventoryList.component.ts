import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InventarioService } from '@services/inventario.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-low-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './lowInventoryList.component.html',
  styleUrl: './lowInventoryList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LowInventoryListComponent implements OnInit {
  constructor(public inventarioService:InventarioService){}

  ngOnInit(): void {
    this.inventarioService.getLowINventario();
  }
}
