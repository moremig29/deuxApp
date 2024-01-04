import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';

import { ClientesService } from '@services/clientes.service';
import { Cliente } from '@interfaces/cliente.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientesComponent {

  public formCliente: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', Validators.required],
    id: []
  });

  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    public clientesService: ClientesService
  ) { }

  resetForm() {
    this.formCliente.reset({
      nombre: '',
      telefono: '',
      email: '',
      id: 0
    });
  }

  editarCliente(cliente: Cliente) {
    this.editar = true;
    this.formCliente.setValue(cliente);
  }

  eliminarCliente(cliente: Cliente) {

    Swal.fire({
      title: 'Estás seguro de borrar',
      text: cliente.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCliente(cliente.id!);
        Swal.fire('Deleted!', 'Cliente eliminado', 'success');
      }
    });
  }

  registrarCliente() {

    if (!this.editar) {
      this.createCliente();
    } else {
      this.updateCliente();
    }
    this.resetForm();
  }

  createCliente(){
    this.clientesService.postCliente( this.formCliente.value )
      .subscribe( () => {} )
  }

  updateCliente(){
    this.clientesService.putCliente( this.formCliente.value )
      .subscribe( () => {
        this.editar = false;
      } );
  }

  deleteCliente( id: string ){
    this.clientesService.deleteCliente( id )
      .subscribe( () => {} )
  }


}
