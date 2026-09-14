import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../classes/enums/enums';
import type { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFixedTransactionUpdateComponent } from '../dialogs/dialog-fixed-transaction-update/dialog-fixed-transaction-update.component';
import { MessageService } from '../../service/message.service';

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

  get isFormValid(): boolean {
    return this.form.valid;
  }

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private fixedTransactionService: FixedTransactionService,
    @Optional() private readonly dialogRef: MatDialogRef <DialogFixedTransactionUpdateComponent>,
    private readonly messageService: MessageService
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
        name: ['', Validators.required],
        amount: ['', Validators.required],
        transDate: ['', Validators.required]
      });

      this.primaryButton = 'Adicionar';
      this.secondButton = 'Limpar';
    }
    
    if(this.action == 'update'){

      this.form = this.fb.group({
        name: [this.data.name],
        amount: [this.data.amount],
        transDate: [this.data.transactionDate]
      });

      this.primaryButton = 'Salvar';
      this.secondButton = 'Cancelar'
    }
  }

  async submit(){
    const amount = ((this.form.get('amount').value) * 100);

    if(this.action == 'create'){
      if(this.category == Category.INCOME){
        const incomeDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: amount,
          category: Category.INCOME,
          isActive: true,
          transactionDate: this.form.get('transDate').value
        }
        await this.fixedTransactionService.save(incomeDto).then(() => {
          this.messageService.showSuccess('Receita Adicionada!');
        });
      }
      if(this.category == Category.EXPENDITURE){
        const expenditureDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: amount,
          category: Category.EXPENDITURE,
          isActive: true,
          transactionDate: this.form.get('transDate').value
        }
        await this.fixedTransactionService.save(expenditureDto).then(() => {
          this.messageService.showSuccess('Despesa Adicionada!');
        });
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
          transactionDate: this.form.get('transDate').value
        }

        incomeDto.id = this.data.id;

        await this.fixedTransactionService.update(incomeDto).then(() => {
          this.messageService.showSuccess('Receita Atualizada!');
        });
      }
      if(this.category == Category.EXPENDITURE){
        const expenditureDto: FixedTransactionDto = {
          name: this.form.get('name').value,
          amount: this.form.get('amount').value,
          category: Category.EXPENDITURE,
          isActive: true,
          transactionDate: this.form.get('transDate').value
        }

        expenditureDto.id = this.data.id;

        await this.fixedTransactionService.update(expenditureDto).then(() => {
          this.messageService.showSuccess('Despesa Atualizada!');
        });
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
