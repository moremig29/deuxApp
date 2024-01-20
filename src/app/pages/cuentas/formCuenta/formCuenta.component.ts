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
import { PedidosService } from '../../../services/pedidos.service';
import { ClientesService } from '../../../services/clientes.service';

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
    cliente: ['', [Validators.required]],
    pedido: ['', [Validators.required]],
    monto: [0, [Validators.required]],
    tipoTransac: ['64da5a45ff830e89b92e70a7', [Validators.required]],
    tipoCuenta: ['64da5aa7ff830e89b92e70ae', [Validators.required]],
    banco: ['65ac15756aefe2a4d2beb7e4', [Validators.required]],
    moneda: ['65abf65167eec9111140078f', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public listasService: ListasService,
    public cuentaService: CuentaService,
    public pedidosService: PedidosService,
    public clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.cuentaService.getCuentasByType();
  }

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
        this.cuentaService.getCuentasByType();
      });
  }
}
