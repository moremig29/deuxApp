import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaService } from '@services/cuenta.service';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list-cuenta',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule],
  templateUrl: './listCuenta.component.html',
  styleUrl: './listCuenta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListCuentaComponent {
  constructor(public cuentaService: CuentaService, private router: Router) {}

  ngOnInit(): void {
    this.cuentaService.getCuentas();
  }

  data = [];
  editarOperacion(cuenta:any){
    this.cuentaService.cuenta = cuenta;
    this.router.navigateByUrl('/cuenta/registrar')
  }

  eliminarOperacion(id:any){
    this.cuentaService.deleteCuenta(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

}
