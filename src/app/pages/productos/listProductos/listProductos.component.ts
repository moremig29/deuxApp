import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductosService } from '@services/productos.service';
import { Producto } from '@interfaces/producto.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './listProductos.component.html',
  styleUrl: './listProductos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListProductosComponent {

  constructor(
    private router: Router,
    public productoService: ProductosService
  ){}

  ngOnInit(): void {
    this.productoService.getProductos();
  }

  editarProducto(producto: Producto) {
    this.productoService.producto = producto;
    this.router.navigateByUrl('/productos/configurar');
  }

  eliminarProducto(producto: Producto) {

    Swal.fire({
      title: 'Estás seguro de borrar',
      text: producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProducto(producto.id!);
        Swal.fire('Deleted!', 'Producto eliminado', 'success');
      }
    });
  }

  deleteProducto( id: string ) {
    this.productoService.deleteProducto( id )
      .subscribe( () => {

      })
  }
}
