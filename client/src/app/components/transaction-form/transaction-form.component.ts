import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogTransactionUpdateComponent } from '../dialogs/dialog-transaction-update/dialog-transaction-update.component';
import { MatDialogRef } from '@angular/material/dialog';
import type { TransactionDto } from '../../dto/transaction.dto';
import { VariableExpenditureService } from '../../service/variable-expentidure.service';
import { TransactionService } from '../../service/transaction.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnInit {

  expenditures: VariableExpenditureDto[] = [];

  maxDate = new Date();

  @Input() action: string = '';
  @Input() data: TransactionDto;

  @Output()
  onSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly variableExpenditureService: VariableExpenditureService,
    private readonly transactionService: TransactionService,
    @Optional() private readonly dialogRef: MatDialogRef <DialogTransactionUpdateComponent>,
    private readonly messageService: MessageService
  ){}

  title: string;
  primaryButton: string;
  secondButton: string;

  form: FormGroup;

  async ngOnInit(): Promise<void> {
    this.expenditures = await this.variableExpenditureService.findAll();

    this.form = this.fb.group({
      expenditure: [''],
      amount: [''],
      description: [''],
      transDate: ['']
    });

    if(this.action == 'create'){
      this.title = 'Adicionar';
      this.primaryButton = 'Adicionar'
      this.secondButton = 'Limpar'

    }else{
      this.form.patchValue(this.data);
      
      const exp = this.expenditures.find(e => e.id === this.data.expenditure.id);
      this.form.get('expenditure').setValue(exp);

      this.title = 'Editar'
      this.primaryButton = 'Salvar'
      this.secondButton = 'Cancelar'
    }
  }

  async submit(){
    const amount = ((this.form.get('amount').value) * 100);
    if (this.action == 'create'){
      const transactionDto: TransactionDto = {
        expenditure: this.form.get('expenditure')?.value,
        amount: amount,
        description: this.form.get('description')?.value,
        transDate: this.form.get('transDate')?.value
      }
      
      await this.transactionService.save(transactionDto).then(() => {
        this.messageService.showSuccess('Transação Adicionada!')  
      });

      this.onSubmit.emit();
      return;
    }else{
      const transactionDto: TransactionDto = {
        expenditure: this.form.get('expenditure').value,
        amount: amount,
        description: this.form.get('description').value,
        transDate: this.form.get('transDate').value
      }

      transactionDto.id = this.data.id;

      await this.transactionService.update(transactionDto);
      this.dialogRef.close();
    }
  }

  secondaryAction(){
    if (this.action == 'create'){
      this.form.reset();
    }
    if(this.action == 'update'){
      this.dialogRef.close();
    }
  }
}
