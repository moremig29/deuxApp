import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Inventario } from '@interfaces/inventario.interface';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ListasService } from '@services/listas.service';

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

  public formInventario: FormGroup = this.fb.group({
    categoria: ['', Validators.required],
    concepto: [''],
    inicial: [0, Validators.required],
    ventas: [0, Validators.required],
    compras: [0, Validators.required],
    final: [0, Validators.required],
    id: []
  });

  editar: boolean = false;

  constructor(
    public inventarioService: InventarioService,
    private fb: FormBuilder,
    public listasService: ListasService
  ) {

  }

  resetFormulario() {
    this.formInventario.reset({
      articulo: '',
      concepto: '',
      inicial: 0,
      ventas: 0,
      compras: 0,
      final: 0,
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
        this.editar = false;
      });
  }

  deleteInventario(id: string) {
    this.inventarioService.deleteInventario(id).subscribe((res) => {
      console.log(res);
    });
  }

  setInventarioEditar(inventario: Inventario) {
    this.editar = true;
    this.formInventario.setValue(inventario);
  }

  eliminarInventario(inventario: Inventario) {
    Swal.fire({
      title: 'Estás seguro de borrar',
      text: inventario.concepto,
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

  calcularFinal(){
    let { inicial, compras, ventas } = this.formInventario.value;
    let final = inicial + compras - ventas;
    this.formInventario.get('final')!.setValue(final);
  }
}
