import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '@services/clientes.service';
import { InventarioService } from '@services/inventario.service';
import { ListasService } from '@services/listas.service';
import { PedidosService } from '@services/pedidos.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
  ],
  templateUrl: './formPedidos.component.html',
  styleUrl: './formPedidos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormPedidosComponent {
  registrarPedidoForm: FormGroup = this.fb.group({
    cliente: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
    lugarEntrega: [''],
    items: this.fb.group({
      articulo: ['', [Validators.required]],
      cantidad: [0, [Validators.required]],
      disponible: [0],
      precio: [0],
    }),
    total: [0, [Validators.required]],
    estatus: ['64da567d065a9a2759773307', [Validators.required]],
  });

  costoTotal: number = 0;
  editar: boolean = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    public clientesService: ClientesService,
    public inventarioService: InventarioService,
    public listasService: ListasService,
    private pedidosService: PedidosService,
    private router: Router
  ) {
    this.setFormValues();
  }

  ngOnDestroy(): void {
    this.pedidosService.pedido = null;
  }

  registrarPedido() {
    this.registrarPedidoForm.markAllAsTouched();

    this.calcularTotal();

    let data = this.registrarPedidoForm.value;
    data.fechaEntrega = new Date(data.fechaEntrega);

    if (!this.editar) {
      this.pedidosService
        .postPedido(this.registrarPedidoForm.value)
        .subscribe((res: any) => {
          console.log(res);
        });
    } else {
      this.pedidosService
        .putPedido(this.registrarPedidoForm.value, this.id)
        .subscribe((res: any) => {
          console.log(res);
        });
    }
    this.router.navigateByUrl('/pedidos');

  }

  asignarValoresArticulo(event: any) {
    let id = event.value;
    let item = this.findItem(id);

    console.log( item );

    if (item) {
      this.registrarPedidoForm.get(['items', 'disponible'])?.setValue(item.final);
      this.registrarPedidoForm.get(['items', 'precio'])?.setValue(0);
    }
  }

  calcularTotal() {

    let test = this.registrarPedidoForm.get('items')?.value;

    let costoTotal = test.cantidad * test.precio;

    this.registrarPedidoForm.get('total')?.setValue(costoTotal);
  }

  findItem(id: string) {
    let item = this.inventarioService
      .inventario()
      .find((articulo) => articulo.id === id);
    return item;
  }

  setFormValues() {
    if (!this.pedidosService.pedido) return;

    const value = this.pedidosService.pedido;

    let { id, cliente, estatus, items, ...pedido } = value;
    this.id = id;

    let item = this.findItem(items.articulo._id);

    pedido.items = items;
    pedido.items = {
      disponible: item!.final,
      precio: 0,//item!.producto.precio_venta,
      articulo: items.articulo._id,
      cantidad: items.cantidad,
    }

    pedido.cliente = cliente._id;
    pedido.estatus = estatus._id;
    pedido.fechaEntrega = new Date(pedido.fechaEntrega);

    this.registrarPedidoForm.setValue(pedido);
    this.editar = true;
  }
}
