import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleTrashedService } from '../../service/toggle-trashed.service';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { Category } from '../../classes/enums/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trashed-transactions',
  templateUrl: './trashed-transactions.component.html',
  styleUrl: './trashed-transactions.component.scss'
})
export class TrashedTransactionsComponent implements OnInit{

  dataSource = new MatTableDataSource<TransactionTableDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'category', 'type'];
  Category = Category;

  constructor(
    private readonly toggleEnabledService: ToggleTrashedService,
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
    const data = await this.toggleEnabledService.findTrashedTransactions();

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
