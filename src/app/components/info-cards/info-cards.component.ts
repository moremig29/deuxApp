import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardsComponent {
  @Input() icono: string = '../assets/img/icons/unicons/cc-primary.png';
  @Input() titulo: string = 'titulo';
  @Input() valor: number = 0;
  @Input() info: string | undefined;
  @Input() borderColor: string | undefined;
}
