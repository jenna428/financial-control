import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDto } from '../../dto/transaction.dto';
import { TransactionService } from '../../service/transaction.service';
import { DialogTransactionUpdateComponent } from '../dialogs/dialog-transaction-update/dialog-transaction-update.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.scss'
})
export class TransactionCreateComponent implements OnInit{

  dataSource = new MatTableDataSource<TransactionDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'despesa', 'description', 'amount'];

  constructor(
    private readonly transactionService: TransactionService,
    private dialog: MatDialog
  ){}

  /*paginator*/
  length: number;
  pageSize = 25;
  pageIndex = 0;

  hidePageSize = true;

  pageEvent: PageEvent;

  ngOnInit(): void {
    this.load();
  }

  async load(){
    const data = await this.transactionService.findAll();

    this.dataSource.data = data;
    this.length = data.length;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async openUpdateDialog(transaction: TransactionDto){
    const dialogRef = this.dialog.open(DialogTransactionUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  openDeleteDialog(transaction: TransactionDto) {
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
