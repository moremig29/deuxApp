import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Inventario } from '@interfaces/inventario.interface';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InsumosService } from '@services/insumos.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InventarioByMesPipe } from '../../pipes/inventario-by-mes.pipe';

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
    ToastModule,
    FormsModule,
    InventarioByMesPipe
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export default class InventarioComponent {
  today: Date = new Date();
  currentMonth: Date;

  public formInventario: FormGroup = this.fb.group({
    insumo: ['', Validators.required],
    inicial: [0, Validators.required],
    ventas: [0],
    compras: [0],
    final: [0, Validators.required],
    fecha: [this.today, Validators.required],
    id: [],
  });

  editar: boolean = false;

  constructor(
    public inventarioService: InventarioService,
    private fb: FormBuilder,
    public insumosService: InsumosService,
    private ms: MessageService
  ) {
    this.currentMonth = new Date();
  }

  resetFormulario() {
    this.formInventario.reset({
      insumo: '',
      inicial: 0,
      ventas: 0,
      compras: 0,
      final: 0,
      fecha: this.today,
      id: '',
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
      .subscribe((res: any) => {
        this.ms.add({
          severity: 'success',
          summary: 'Registrado',
          detail: `Se ha guardo el inventario del insumo ${res.data.insumo.nombre}  correctamente`,
        });
      });
  }

  editInventario() {
    this.inventarioService
      .putInventario(this.formInventario.value)
      .subscribe((res: any) => {
        this.editar = false;
        this.ms.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Se ha guardo el inventario del insumo ${res.data.insumo.nombre}  correctamente`,
        });
      });
  }

  deleteInventario(id: string) {
    this.inventarioService.deleteInventario(id).subscribe((res) => {

    });
  }

  setInventarioEditar(inventario: Inventario) {
    this.editar = true;
    this.formInventario.setValue({
      insumo: inventario.insumo._id,
      inicial: inventario.inicial,
      ventas: inventario.ventas,
      compras: inventario.compras,
      final: inventario.final,
      fecha: new Date(inventario.fecha),
      id: inventario.id,
    });
  }

  eliminarInventario(inventario: Inventario) {
    Swal.fire({
      title: 'Estás seguro de borrar',
      text: inventario.insumo.nombre,
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

  calcularFinal() {
    let { inicial, compras, ventas } = this.formInventario.value;
    let final = inicial + compras - ventas;
    this.formInventario.get('final')!.setValue(final);
  }
}
