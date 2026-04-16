import { Component, Inject, Input, OnInit } from '@angular/core';
import type { ToggleEnabledDto } from '../../../dto/toggle-enabled.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FixedTransactionService } from '../../../service/fixed-transaction.service';
import { VariableExpenditureService } from '../../../service/variable-expentidure.service';

@Component({
  selector: 'app-dialog-delete-transaction',
  templateUrl: './dialog-delete-transaction.component.html',
  styleUrl: './dialog-delete-transaction.component.scss'
})
export class DialogDeleteTransactionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ToggleEnabledDto,
    private dialogRef: MatDialogRef<DialogDeleteTransactionComponent>,
    private readonly fixedTransactionService: FixedTransactionService,
    private readonly variableTransactionService: VariableExpenditureService
  ){}

  ngOnInit(): void {
    
  }

  deletar(){
    if(this.data.isFixed){
      this.fixedTransactionService.delete(this.data.id)
    }else{
      this.variableTransactionService.delete(this.data.id)
    }
    this.dialogRef.close()
  }
}
