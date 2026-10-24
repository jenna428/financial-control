import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionDto } from '../../dto/transaction.dto';
import { TransactionService } from '../../service/transaction.service';
import { DialogTransactionUpdateComponent } from '../dialogs/dialog-transaction-update/dialog-transaction-update.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LayoutService } from '../../service/layout.service';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { firstValueFrom } from 'rxjs';
import { MessageService } from '../../service/message.service';
import { PaginatorRequest } from '../../dto/paginator.dto';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.scss'
})
export class TransactionCreateComponent implements OnInit{

  dataSource = new MatTableDataSource<TransactionDto>();
  columns: string[] = ['date', 'despesa', 'description', 'amount'];
  displayedColumns: string[] = this.columns;

  showSelection = false;

  /*paginator*/
  length: number;

  // pageEvent: PageEvent;
  pag: PaginatorRequest;

  get isMobile(): boolean{
    return this.layoutService.isMobile;
  }

  constructor(
    private readonly transactionService: TransactionService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.pag = {
      pageIndex: 0,
      pageSize: 5
    }
    this.load();
  }

  async load(){

    const response = await this.transactionService.findAll(this.pag);

    this.dataSource.data = response.data;
    this.length = response.length;
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

  async deleteAll() {
    const confirm = await firstValueFrom(this.dialog.open(DialogConfirmComponent).afterClosed())

    if (confirm != 'true') {
      return;
    }

    const ids = this.dataSource.data
      .filter(t => t.selected)
      .map(t => t.id);

    await this.transactionService.delete(ids).then(() => {
      this.messageService.showSuccess('Transação Deletada!')
      this.load()
    })
  }

  async handlePageEvent(e: PageEvent) {
    this.pag = {
      pageIndex: e.pageIndex,
      pageSize: e.pageSize,
    }

    await this.load();  
  }

  isAllSelected(): boolean {
    return this.dataSource.data.length > 0 &&
    this.dataSource.data.every(transaction => transaction.selected);
  }

  isNoneSelected(): boolean{
    return this.dataSource.data.length > 0 && this.dataSource.data.every(transaction => !transaction.selected);
  }

  isSomeSelected(): boolean {
    return this.dataSource.data.some(transaction => transaction.selected) &&
      !this.isAllSelected();
  }

  toggleAll(checked: boolean): void {
    this.dataSource.data.forEach(transaction => {
      transaction.selected = checked;
    });
  }

  toggleSelection() {
    this.showSelection = !this.showSelection;

    this.displayedColumns = this.showSelection
    ? ['select'].concat(this.columns)
    : this.columns;
  }
}
