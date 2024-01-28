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
    articulos: this.fb.array([]),
    total: [0, [Validators.required]],
    estatus: ['64da567d065a9a2759773307', [Validators.required]],
  });

  costoTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    public clientesService: ClientesService,
    public inventarioService: InventarioService,
    public listasService: ListasService,
    private pedidosService: PedidosService
  ) {
    this.addProducto();
    this.setFormValues();
  }

  registrarPedido() {
    this.registrarPedidoForm.markAllAsTouched();

    this.calcularTotal();

    let data = this.registrarPedidoForm.value;
    data.fechaEntrega = new Date(data.fechaEntrega);

    this.pedidosService
      .postPedido(this.registrarPedidoForm.value)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  productoSolicitados(): FormArray {
    return this.registrarPedidoForm.get('articulos') as FormArray;
  }

  newProductoSolicitado(): FormGroup {
    return this.fb.group({
      articulo: ['', [Validators.required]],
      cantidad: [0, [Validators.required]],
      disponible: [0],
      precio: [0],
    });
  }

  addProducto() {
    this.productoSolicitados().push(this.newProductoSolicitado());
  }

  asignarValoresArticulo(event: any, producto: any) {

    let id = event.value;
    let item = this.findItem( id )

    if (item) {
      producto.get('disponible')?.setValue(item.cantidad);
      producto.get('precio')?.setValue(item.producto.precio_venta);
    }
  }

  calcularTotal() {
    console.log( 'calculando....' )
    this.costoTotal = 0;
    let test = this.registrarPedidoForm.get('articulos')?.value;
    test.forEach((element: any) => {
      this.costoTotal += element.cantidad * element.precio;
    });
    this.registrarPedidoForm.get('total')?.setValue(this.costoTotal);
  }

  findItem( id: string ) {
    let item = this.inventarioService
      .inventario()
      .find((articulo) => articulo.id === id);
    return item
  }

  setFormValues() {

    if( !this.pedidosService.pedido ) return

    const value = this.pedidosService.pedido;

    let { id, cliente, estatus, articulos, ...pedido } = value

    let item = this.findItem( articulos[0].articulo._id )

    pedido.articulos = articulos;
    pedido.articulos = [
      {
        disponible: item!.cantidad,
        precio: item!.producto.precio_venta,
        articulo: articulos[0].articulo._id,
        cantidad: articulos[0].cantidad
      }
    ]

    pedido.cliente = cliente._id;
    pedido.estatus = estatus._id;
    pedido.fechaEntrega = new Date( pedido.fechaEntrega );

    console.log( pedido );

    this.registrarPedidoForm.setValue( pedido );
  }
  
}
