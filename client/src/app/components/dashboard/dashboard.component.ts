import { Component } from '@angular/core';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  _count: number = 1;
  
  get count() {
    return this._count++;
  }

  constructor(
    public messageService: MessageService
  ){}


}
