import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { Category } from '../../classes/enums/enums';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrl: './income-create.component.scss'
})
export class IncomeCreateComponent implements OnInit{

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fixedTransactionService: FixedTransactionService
  ){}

  async ngOnInit() {

    this.form = this.fb.group({
      name: [''],
      amount: [''],
      transDate: ['']
    });
  }

  action = 'Adicionar Receita';
  pButton = 'Adicionar';
  sButton = 'Limpar';
  category = Category.INCOME;

  submit(){
    const incomeDto: FixedTransactionDto = {
      name: this.form.get('name').value,
      amount: this.form.get('amount').value,
      category: Category.INCOME,
      isActive: true,
      transactionData: this.form.get('transDate').value
    }
    this.fixedTransactionService.save(incomeDto)
  }
}
