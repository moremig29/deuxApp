import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageService } from '@services/message.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MessagesComponent {
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages();
  }
}
