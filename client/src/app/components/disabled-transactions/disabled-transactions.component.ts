import { Component, OnInit } from '@angular/core';
import { ToggleEnabledService } from '../../service/toggle-enabled.service';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { Category } from '../../classes/enums/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';

@Component({
  selector: 'app-disabled-transactions',
  templateUrl: './disabled-transactions.component.html',
  styleUrl: './disabled-transactions.component.scss'
})
export class DisabledTransactionsComponent implements OnInit{
  dataSource: TransactionTableDto[] = [];
  displayedColumns: string[] = ['name', 'category', 'type'];
  Category = Category;

  constructor(
    private readonly toggleEnabledService: ToggleEnabledService,
    private readonly dialog: MatDialog
  ){}

  async ngOnInit() {
    this.load();
  }

  async load(){
    this.dataSource = await this.toggleEnabledService.findDisabledTransactions();
  }

  async isActive(id: number, isFixed: boolean){
    await this.toggleEnabledService.isActive(id, isFixed);
    await this.load();
  }

  openDeleteDialog(transaction: TransactionTableDto) {
    const dialogRef = this.dialog.open(DialogDeleteTransactionComponent, {
      data: transaction,
      width: '400px',
      height: '180px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

}
