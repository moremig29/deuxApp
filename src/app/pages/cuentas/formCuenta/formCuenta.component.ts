import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListasService } from '@services/listas.service';
import { CuentaService } from '@services/cuenta.service';
import { InfoCardsComponent } from '../../../components/info-cards/info-cards.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-form-cuenta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfoCardsComponent,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
  ],
  templateUrl: './formCuenta.component.html',
  styleUrl: './formCuenta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormCuentaComponent {
  public registrarCuentaForm: FormGroup = this.fb.group({
    desc: [''],
    monto: [0, [Validators.required]],
    tipoTransac: ['', [Validators.required]],
    tipoCuenta: ['', [Validators.required]],
    banco: ['', [Validators.required]],
    moneda: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public listasService: ListasService,
    private cuentaService: CuentaService
  ) {}

  resetForm() {
    this.registrarCuentaForm.reset({
      desc: '',
      monto: 0,
      tipoCuenta: '',
      tipotransar: '',
      banco: '',
      moneda: '',
      fecha: '',
    });
  }

  registrarCuenta() {
    this.cuentaService
      .postCuenta(this.registrarCuentaForm.value)
      .subscribe((data) => {
        this.resetForm();
        this.cuentaService.getCuentas();
      });
  }
}
