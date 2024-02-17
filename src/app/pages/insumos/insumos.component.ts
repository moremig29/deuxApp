import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { InsumosService } from '@services/insumos.service';
import { Insumo } from '@interfaces/insumo.interface';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListasService } from '@services/listas.service';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    ToastModule,
    CheckboxModule,
  ],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export default class InsumosComponent implements OnInit {
  public formInsumos: FormGroup = this.fb.group({
    categoria: ['', Validators.required],
    nombre: ['', Validators.required],
    unidadesCompra: [0],
    costoCompra: [0],
    costoUnidad: [0, Validators.required],
    basico: [false, Validators.required],
    id: ['', []],
  });

  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public insumosService: InsumosService,
    public listasService: ListasService,
    private ms: MessageService
  ) {}

  ngOnInit(): void {
    this.insumosService.getInsumos();
  }

  setInsumoEditar(insumo: any) {
    this.editar = true;
    this.formInsumos.setValue({
      categoria: insumo.categoria._id,
      nombre: insumo.nombre,
      unidadesCompra: insumo.unidadesCompra,
      costoCompra: insumo.costoCompra,
      costoUnidad: insumo.costoUnidad,
      basico: insumo.basico ? insumo.basico : false,
      id: insumo.id,
    });
  }

  cancelarEdicion() {
    this.editar = false;
    this.resetForm();
  }

  resetForm() {
    this.formInsumos.setValue({
      categoria: '',
      nombre: '',
      unidadesCompra: 0,
      costoCompra: 0,
      costoUnidad: 0,
      id: '',
    });
  }

  eliminarInsumo(insumo: Insumo) {
    Swal.fire({
      title: 'Estás seguro de borrar',
      text: insumo.nombre,
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
      .subscribe((res: any) => {
        console.log(res);
        this.ms.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Se ha registrado el insumo ${res.data.nombre}  correctamente`,
        });
      });
  }

  updateInsumo() {
    this.insumosService
      .putInsumo(this.formInsumos.value)
      .subscribe((res: any) => {
        this.editar = false;
        console.log(res);
        this.ms.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Se ha actualizado el insumo ${res.data.nombre}  correctamente`,
        });
      });
  }

  calcularCostoUnidad() {
    console.log('calculando...');
    let costoCompra = this.formInsumos.get('costoCompra')?.value;
    let unidadesCompra = this.formInsumos.get('unidadesCompra')?.value;

    if (costoCompra && unidadesCompra) {
      let costoUnidad = costoCompra / unidadesCompra;
      this.formInsumos.get('costoUnidad')?.setValue(costoUnidad);
    }
  }
}
