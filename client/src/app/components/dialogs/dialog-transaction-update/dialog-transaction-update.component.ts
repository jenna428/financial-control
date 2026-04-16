import { Component, Inject, OnInit } from '@angular/core';
import type { TransactionDto } from '../../../dto/transaction.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './dialog-transaction-update.component.html',
  styleUrl: './dialog-transaction-update.component.scss'
})
export class DialogTransactionUpdateComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA)
      public data: TransactionDto,
  ){}

  ngOnInit(): void {
    
  }

}
