import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';

import { ProductosService } from '@services/productos.service';
import { Inventario } from '@interfaces/inventario.interface';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InventarioComponent {
  today: Date = new Date();

  public formInventario: FormGroup = this.fb.group({
    articulo: ['', Validators.required],
    producto: [''],
    cantidad: [0, Validators.required],
    fecha_compra: [this.today, Validators.required],
    id: [],
  });

  editar: boolean = false;

  constructor(
    public inventarioService: InventarioService,
    private fb: FormBuilder,
    public productoService: ProductosService
  ) {
    /* this.today = new Date() */;
    this.formInventario.get('fecha_compra')?.setValue(this.today);
  }

  resetFormulario() {
    this.formInventario.reset({
      articulo: '',
      producto: '',
      cantidad: 0,
      fecha_compra: this.today,
    });
  }

  registrarInventario() {
    if (!this.editar) {
      this.createInventario();
    } else {
      this.editInventario();
    }

    this.resetFormulario();
  }

  createInventario() {
    this.inventarioService
      .postInventario(this.formInventario.value)
      .subscribe((res) => {
        console.log(res);
      });
  }

  editInventario() {
    this.inventarioService
      .putInventario(this.formInventario.value)
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteInventario(id: string) {
    this.inventarioService.deleteInventario(id).subscribe((res) => {
      console.log(res);
    });
  }

  setInventarioEditar(inventario: Inventario) {
    this.editar = true;
    inventario.fecha_compra = new Date(inventario.fecha_compra)
    this.formInventario.setValue(inventario);
    this.formInventario.get('producto')?.setValue(inventario.producto._id);
  }

  eliminarInventario(inventario: Inventario) {
    Swal.fire({
      title: 'Estás seguro de borrar',
      text: inventario.articulo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteInventario(inventario.id!);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
