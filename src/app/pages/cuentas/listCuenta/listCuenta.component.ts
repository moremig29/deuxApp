import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CuentaService } from '@services/cuenta.service';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list-cuenta',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule
  ],
  templateUrl: './listCuenta.component.html',
  styleUrl: './listCuenta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListCuentaComponent {

  constructor(
    public cuentaService: CuentaService
  ){}

  ngOnInit(): void {
    this.cuentaService.getCuentas();
  }

  data = [];
}
