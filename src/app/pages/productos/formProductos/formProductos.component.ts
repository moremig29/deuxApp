import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';

import { InsumosService } from '@services/insumos.service';
import { ProductosService } from '@services/productos.service';
import { Producto } from '@interfaces/producto.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-form-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PickListModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
  ],
  templateUrl: './formProductos.component.html',
  styleUrl: './formProductos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormProductosComponent {
  targetProducts: any;
  costoTotal: number = 0;
  precioAsignado: number = 0;
  nombreProducto: string = '';
  producto!: Producto;
  editar: boolean = false;

  constructor(
    public insumosService: InsumosService,
    public productosService: ProductosService
  ) {
    this.targetProducts = [];
  }

  ngOnInit(): void {
    if (this.productosService.producto) {
      this.producto = this.productosService.producto;
      this.cargarConfiguracion();
    }
  }

  ngOnDestroy(): void {
    this.productosService.producto = undefined;
  }

  calcularCosto(event: any ) {

    console.log(event)
    this.costoTotal = 0;

    this.targetProducts.forEach((element: any) => {
      this.costoTotal += Number(element.costoUnidad);
    });
  }

  cargarConfiguracion() {
    this.targetProducts = [...this.producto.insumos];
    this.nombreProducto = this.producto.nombre;
    this.precioAsignado = this.producto.precio_venta;
    this.editar = true;
    this.calcularCosto(undefined);
  }

  registrarProducto() {
    let producto: Producto = {
      nombre: this.nombreProducto,
      insumos: this.CrearInsumos(),
      costo_total: this.costoTotal,
      precio_venta: this.precioAsignado,
      img: '5.jpg',
      rating: 5,
    };

    if (!this.editar) {
      this.createProducto(producto);
    } else {
      producto.id = this.producto.id;
      this.updateProducto(producto);
    }

    this.resetVariables();
  }

  createProducto(producto: Producto) {
    this.productosService.postProducto(producto).subscribe((res: any) => {});
  }

  updateProducto(producto: Producto) {
    this.productosService.putProducto(producto).subscribe((res: any) => {});
  }

  CrearInsumos() {
    let insumos: string[] = [];
    this.targetProducts.forEach((insumo: any) => {
      insumos.push(insumo.id ? insumo.id : insumo._id);
    });

    return insumos;
  }

  resetVariables() {
    this.targetProducts = [];
    this.nombreProducto = '';
    this.precioAsignado = 0;
    this.costoTotal = 0;
    this.editar = false;
  }
}
