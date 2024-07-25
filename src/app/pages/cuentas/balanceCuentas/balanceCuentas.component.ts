import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuentaService } from '@services/cuenta.service';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-balance-cuentas',
  standalone: true,
  imports: [CommonModule, CalendarModule, FloatLabelModule, FormsModule],
  templateUrl: './balanceCuentas.component.html',
  styleUrl: './balanceCuentas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BalanceCuentasComponent {
  date: Date | undefined;

  constructor( public cuentaService: CuentaService ){}

  monthChange() {
    console.log('monthChange:', this.date?.getMonth() );

    if (this.date)
    this.cuentaService.getcuentaBalanceByMonth( this.date?.getMonth() + 1 )
  }
}
