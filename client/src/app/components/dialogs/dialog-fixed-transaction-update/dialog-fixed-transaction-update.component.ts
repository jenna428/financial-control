import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../../classes/enums/enums';
import type { FixedTransactionDto } from '../../../dto/fixed-transaction.dto';

@Component({
  selector: 'app-dialog-fixed-transaction-update',
  templateUrl: './dialog-fixed-transaction-update.component.html',
  styleUrl: './dialog-fixed-transaction-update.component.scss'
})
export class DialogFixedTransactionUpdateComponent {
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
