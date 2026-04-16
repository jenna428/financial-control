import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../classes/enums/enums';
import type { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogFixedTransactionUpdateComponent } from '../dialogs/dialog-fixed-transaction-update/dialog-fixed-transaction-update.component';

@Component({
  selector: 'app-fixed-transaction-form',
  templateUrl: './fixed-transaction-form.component.html',
  styleUrl: './fixed-transaction-form.component.scss'
})
export class FixedTransactionFormComponent implements OnInit {

  @Input()
  data: FixedTransactionDto;

  @Output()
  onSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private fixedTransactionService: FixedTransactionService,
    @Optional() private readonly dialogRef: MatDialogRef <DialogFixedTransactionUpdateComponent>,
  ){}

  form: FormGroup;

  @Input() action: string = '';
  @Input() category: Category;
  @Input() title: string = '';

  maxDate = new Date();

  primaryButton: string = '';
  secondButton: string = '';

  ngOnInit(): void {

    if(this.action == 'create'){

      this.form = this.fb.group({
        name: [''],
        amount: [''],
        transDate: ['']
      });

      this.primaryButton = 'Adicionar';
      this.secondButton = 'Limpar';
    }
    
    if(this.action == 'update'){

      this.form = this.fb.group({
        name: [this.data.name],
        amount: [this.data.amount],
        transDate: [this.data.transactionData]
      });

      this.primaryButton = 'Salvar';
      this.secondButton = 'Cancelar'
    }
  }

  async submit(){
    if(this.action == 'create'){
      if(this.category == Category.INCOME){
        const incomeDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: this.form.get('amount').value,
          category: Category.INCOME,
          isActive: true,
          transactionData: this.form.get('transDate').value
        }
        await this.fixedTransactionService.save(incomeDto)
      }
      if(this.category == Category.EXPENDITURE){
        const expenditureDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: this.form.get('amount').value,
          category: Category.EXPENDITURE,
          isActive: true,
          transactionData: this.form.get('transDate').value
        }
        await this.fixedTransactionService.save(expenditureDto)
      }

      this.onSubmit.emit();
    }

    if(this.action == 'update'){
      if(this.category == Category.INCOME) {
        const incomeDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: this.form.get('amount').value,
          category: Category.INCOME,
          isActive: true,
          transactionData: this.form.get('transDate').value
        }

        incomeDto.id = this.data.id;

        await this.fixedTransactionService.update(incomeDto);
      }
      if(this.category == Category.EXPENDITURE){
        const expenditureDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: this.form.get('amount').value,
          category: Category.EXPENDITURE,
          isActive: true,
          transactionData: this.form.get('transDate').value
        }

        expenditureDto.id = this.data.id;

        await this.fixedTransactionService.update(expenditureDto);
      }

      this.dialogRef.close()
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
