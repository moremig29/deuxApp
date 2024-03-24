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
import { Router } from '@angular/router';

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
    pedido: [''],
    monto: [0, [Validators.required]],
    tipoTransac: ['64da5a45ff830e89b92e70a7', [Validators.required]],
    tipoCuenta: ['64da5aa7ff830e89b92e70ae', [Validators.required]],
    banco: ['65ac15756aefe2a4d2beb7e4', [Validators.required]],
    moneda: ['65abf65167eec9111140078f', [Validators.required]],
    fecha: ['', [Validators.required]],
    id: ['']
  });

  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public listasService: ListasService,
    public cuentaService: CuentaService,
    public pedidosService: PedidosService,
    public clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cuentaService.getCuentasByType();
    this.pedidosService.getPedidos();
    this.setCuentaEditar();
  }

  ngOnDestroy(): void {
    this.cuentaService.cuenta = undefined;
  }

  resetForm() {
    this.registrarCuentaForm.reset({
      desc: '',
      cliente: '',
      pedido: '',
      monto: 0,
      tipotransac: '64da5a45ff830e89b92e70a7',
      tipoCuenta: '64da5aa7ff830e89b92e70ae',
      banco: '65ac15756aefe2a4d2beb7e4',
      moneda: '65abf65167eec9111140078f',
      fecha: '',
      id: ''
    });
  }

  registrarCuenta() {
    if (!this.editar ) {
      this.cuentaService
        .postCuenta(this.registrarCuentaForm.value)
        .subscribe((data) => {
          this.resetForm();
        });
    } else {
      let id = this.registrarCuentaForm.value.id;
      this.cuentaService
        .putCuenta(id, this.registrarCuentaForm.value)
        .subscribe({
          next: (res: any ) => {
            this.resetForm();
            this.router.navigateByUrl('/cuenta');
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    }
  }

  setCuentaEditar() {
    if ( !this.cuentaService.cuenta ) return;
    let cuenta = this.cuentaService.cuenta;
    console.log
    this.editar = true;
    this.registrarCuentaForm.setValue({
      desc: cuenta.desc,
      cliente: cuenta.cliente._id,
      pedido: cuenta.pedido ? cuenta.pedido._id : '',
      monto: cuenta.monto,
      tipoTransac: cuenta.tipoTransac._id,
      tipoCuenta: cuenta.tipoCuenta._id,
      banco: cuenta.banco._id,
      moneda: cuenta.moneda._id,
      fecha: new Date(cuenta.fecha),
      id: cuenta.id
    });

  }

  setPedidoEgreso() {
    let val = this.registrarCuentaForm.value.tipoTransac;
    if (val === '64da5a4dff830e89b92e70a9') {
      this.registrarCuentaForm.value.pedido = '65d0dd03c3369f4bb5e013a5';
    }
  }
}
