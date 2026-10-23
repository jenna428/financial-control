import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';
import { VariableExpenditureService } from '../../service/variable-expentidure.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogVariableExpenditureUpdateComponent } from '../dialogs/dialog-variable-expenditure-update/dialog-variable-expenditure-update.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';
import { LayoutService } from '../../service/layout.service';
import { firstValueFrom } from 'rxjs';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-variable-expenditure-create',
  templateUrl: './variable-expenditure-create.component.html',
  styleUrl: './variable-expenditure-create.component.scss'
})
export class VariableExpenditureCreateComponent implements OnInit {

  dataSource = new MatTableDataSource<VariableExpenditureDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  columns: string[] = ['name'];
  displayedColumns: string[] = this.columns;
  showSelection = false;

  form: FormGroup;

  /*paginator*/
  length: number;
  pageSize = 25;
  pageIndex = 0;

  hidePageSize = true;

  pageEvent: PageEvent;

  get isMobile(): boolean{
    return this.layoutService.isMobile;
  }
  
  constructor(
    private readonly variableExpenditureService: VariableExpenditureService,
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.load();
  }

  async load() {
    const data = await this.variableExpenditureService.findAll();

    this.dataSource.data = data;
    this.length = data.length;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async openUpdateDialog(transaction: VariableExpenditureDto){
    const dialogRef = this.dialog.open(DialogVariableExpenditureUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  openDeleteDialog(transaction: VariableExpenditureDto) {
    const dialogRef = this.dialog.open(DialogDeleteTransactionComponent, {
      data: {
        id: transaction.id,
        name: transaction.name,
        isFixed: false
      },
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

    await this.variableExpenditureService.delete(ids).then(() => {
      this.messageService.showSuccess('Transação Deletada!')
      this.load()
    })
  }

  //paginator
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
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
