import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuentaService } from '@services/cuenta.service';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InfoCardsComponent } from '../../../components/info-cards/info-cards.component';

@Component({
  selector: 'app-balance-cuentas',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    FloatLabelModule,
    FormsModule,
    InfoCardsComponent,
  ],
  templateUrl: './balanceCuentas.component.html',
  styleUrl: './balanceCuentas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BalanceCuentasComponent {
  date: Date = new Date();

  constructor(public cuentaService: CuentaService) {}

  monthChange() {
      this.cuentaService.getcuentaBalanceByMonth(this.date?.getMonth() + 1);
  }

  ngOnInit(): void {
    let month = this.date.getMonth() + 1

    this.cuentaService.getcuentaBalanceByMonth(month);
  }

}
