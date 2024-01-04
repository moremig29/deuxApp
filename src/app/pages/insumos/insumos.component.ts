import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { InsumosService } from '@services/insumos.service';
import { Insumo } from '@interfaces/insumo.interface';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InsumosComponent {

  public formInsumos: FormGroup = this.fb.group({
    desc: ['', Validators.required],
    precio: [0, Validators.required],
    valor: [0, Validators.required],
    id: [0, []],
  });

  editar: boolean = false;

  constructor(private fb: FormBuilder, public insumosService: InsumosService) {}

  setInsumoEditar(insumo: any) {
    this.editar = true;
    this.formInsumos.setValue(insumo);
  }

  cancelarEdicion() {
    this.editar = false;
    this.resetForm();
  }

  resetForm() {
    this.formInsumos.setValue({
      desc: '',
      precio: 0,
      valor: 0,
      id: 0,
    });
  }

  eliminarInsumo(insumo: Insumo) {
    Swal.fire({
      title: 'Estás seguro de borrar',
      text: insumo.desc,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteInsumo(insumo.id!);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  deleteInsumo(id: string) {
    this.insumosService.deleteInsumo(id).subscribe((res) => {});
  }

  registrarInsumo() {
    if (!this.editar) {
      this.createInsumo();
    } else {
      this.updateInsumo();
    }

    this.resetForm();
  }

  createInsumo() {
    this.insumosService
      .postInsumo(this.formInsumos.value)
      .subscribe((res) => {});
  }

  updateInsumo() {
    this.insumosService
      .putInsumo(this.formInsumos.value)
      .subscribe((res) => {});
  }
}
