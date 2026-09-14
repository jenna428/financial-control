import { Component, Inject, OnInit } from '@angular/core';
import type { TransactionTableDto } from '../../../dto/transaction-table.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FixedTransactionService } from '../../../service/fixed-transaction.service';
import { VariableExpenditureService } from '../../../service/variable-expentidure.service';
import { TransactionService } from '../../../service/transaction.service';
import { MessageService } from '../../../service/message.service';

@Component({
  selector: 'app-dialog-delete-transaction',
  templateUrl: './dialog-delete-transaction.component.html',
  styleUrl: './dialog-delete-transaction.component.scss'
})
export class DialogDeleteTransactionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransactionTableDto,
    private dialogRef: MatDialogRef<DialogDeleteTransactionComponent>,
    private readonly fixedTransactionService: FixedTransactionService,
    private readonly variableTransactionService: VariableExpenditureService,
    private readonly transactionService: TransactionService,
    private readonly messageService: MessageService
  ){}

  ngOnInit(): void {
    
  }

  deletar(){
    if(this.data.isFixed == true){
      this.fixedTransactionService.delete(this.data.id).then(() => {
        this.messageService.showSuccess('Transação Deletada!')
      });
    }
    if(this.data.isFixed == false){
      this.variableTransactionService.delete(this.data.id).then(() => {
        this.messageService.showSuccess('Transação Deletada!')
      });
    }
    if(this.data.isFixed == null){
      this.transactionService.delete(this.data.id).then(() => {
        this.messageService.showSuccess('Transação Deletada!')
      });
    }
    this.dialogRef.close()
  }
  
  cancel(){
    this.dialogRef.close()
  }
}
