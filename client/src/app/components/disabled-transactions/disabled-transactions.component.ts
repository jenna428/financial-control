import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleEnabledService } from '../../service/toggle-enabled.service';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { Category } from '../../classes/enums/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-disabled-transactions',
  templateUrl: './disabled-transactions.component.html',
  styleUrl: './disabled-transactions.component.scss'
})
export class DisabledTransactionsComponent implements OnInit{

  dataSource = new MatTableDataSource<TransactionTableDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'category', 'type'];
  Category = Category;

  constructor(
    private readonly toggleEnabledService: ToggleEnabledService,
    private readonly dialog: MatDialog
  ){}

  /*paginator*/
  length: number;
  pageSize = 10;
  pageIndex = 0;

  hidePageSize = true;

  pageEvent: PageEvent;

  async ngOnInit() {
    this.load();
  }

  async load(){
    const data = await this.toggleEnabledService.findDisabledTransactions();

    this.dataSource.data = data;
    this.length = data.length;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
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

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
