import { Component, Input, OnInit } from '@angular/core';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionService } from '../../service/fixed-transaction.service';

@Component({
  selector: 'app-fixed-transaction-table',
  templateUrl: './fixed-transaction-table.component.html',
  styleUrl: './fixed-transaction-table.component.scss'
})
export class FixedTransactionTableComponent implements OnInit {

  constructor(
    private fixedTransactionService: FixedTransactionService
  ){}

  @Input() category: Category;

  dataSource: FixedTransactionDto[] = [];

  displayedColumns: string[] = ['name', 'amount'];

    async ngOnInit() {
      if(this.category){
        console.log(this.category)
        this.dataSource = await this.fixedTransactionService.findByCategory(this.category);
      }
  }
}
