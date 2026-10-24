import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogFixedTransactionUpdateComponent } from '../dialogs/dialog-fixed-transaction-update/dialog-fixed-transaction-update.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteTransaction, DialogDeleteTransactionComponent } from '../dialogs/dialog-delete-transaction/dialog-delete-transaction.component';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { LayoutService } from '../../service/layout.service';
import { firstValueFrom } from 'rxjs';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { MessageService } from '../../service/message.service';
import { PaginatorRequest } from '../../dto/paginator.dto';

@Component({
  selector: 'app-fixed-transaction-create',
  templateUrl: './fixed-transaction-create.component.html',
  styleUrl: './fixed-transaction-create.component.scss'
})
export class FixedTransactionCreateComponent implements OnInit{
  dataSource = new MatTableDataSource<FixedTransactionDto>();
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  columns: string[] = ['date', 'name', 'amount'];
  displayedColumns: string[] = this.columns

  title: string;
  category: Category;
  showSelection = false;

  /*paginator*/
  length: number;

  // pageEvent: PageEvent;
  pag: PaginatorRequest;

  get isMobile(): boolean {
    return this.layoutService.isMobile;
  }

  constructor(
    private fixedTransactionService: FixedTransactionService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private readonly messageService: MessageService
  ){}

  async ngOnInit() {
    this.pag = {
      pageIndex: 0,
      pageSize: 5
    }

    this.activatedRoute.paramMap.subscribe(async p => {
      await this.onCategoryChange();
    })
  }

  async onCategoryChange() { // colocar aqui coisas que será carregado na criação do componente
    this.category = this.activatedRoute.snapshot.paramMap.get('category') as Category;

    this.title = this.category === Category.INCOME 
      ? 'Adicionar Receita'
      : 'Adicionar Despesa Fixa';

    await this.load();  
  }

  async load(){
    this.showSelection = false;
    if(this.category){
      const response = await this.fixedTransactionService.findByCategory(this.category, this.pag);// TODO: refatorar a chamada na api, pois nao esta usando a paginação.

      this.dataSource.data = response.data;
      this.length = response.length;

      // if (this.paginator) {
      //   this.dataSource.paginator = this.paginator;
      // }
    }
  }
  
  openUpdateDialog(transaction: FixedTransactionDto) {
    const dialogRef = this.dialog.open(DialogFixedTransactionUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  openDeleteDialog(transaction: FixedTransactionDto) {
    const dialogRef = this.dialog.open(DialogDeleteTransactionComponent, {
      data: {
        id: transaction.id,
        name: transaction.name,
        isFixed: true
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

    await this.fixedTransactionService.delete(ids).then(() => {
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
