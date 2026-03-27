import { Component, Input, OnInit } from '@angular/core';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { FixedTransactionUpdateComponent } from '../fixed-transaction-update/fixed-transaction-update.component';


@Component({
  selector: 'app-fixed-transaction-table',
  templateUrl: './fixed-transaction-table.component.html',
  styleUrl: './fixed-transaction-table.component.scss'
})
export class FixedTransactionTableComponent implements OnInit {

  constructor(
    private fixedTransactionService: FixedTransactionService,
    private dialog: MatDialog
  ){}

  @Input() category: Category;

  dataSource: FixedTransactionDto[] = [];

  displayedColumns: string[] = ['name', 'amount'];

  async ngOnInit() {
    await this.load()
  }

  async load(){
    if(this.category){
        this.dataSource = await this.fixedTransactionService.findByCategory(this.category);
      }
  }
  
  openUpdateDialog(transaction: FixedTransactionDto) {
    if(this.category == Category.INCOME){
      const dialogRef = this.dialog.open(FixedTransactionUpdateComponent, {
        data: transaction
      });

      dialogRef.afterClosed().subscribe(result => {
        this.load();
      });
      
    }
  }
}
