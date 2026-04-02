import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import type { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fixed-transaction-update',
  templateUrl: './fixed-transaction-update.component.html',
  styleUrl: './fixed-transaction-update.component.scss'
})
export class FixedTransactionUpdateComponent {
  title: string;
  category: Category;
  action: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: FixedTransactionDto,
  ){}

  async ngOnInit() {
    this.action = 'update';
    this.category = this.data.category;
    this.title = this.category === Category.INCOME 
      ? 'Editar Receita'
      : 'Editar Despesa';
  }

  

}
