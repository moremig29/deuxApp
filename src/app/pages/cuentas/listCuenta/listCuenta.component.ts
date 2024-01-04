import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-cuenta',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './listCuenta.component.html',
  styleUrl: './listCuenta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListCuentaComponent { }
