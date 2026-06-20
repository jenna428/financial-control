import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleEnabledService } from '../../service/toggle-enabled.service';
import { DialogFixedTransactionUpdateComponent } from '../dialogs/dialog-fixed-transaction-update/dialog-fixed-transaction-update.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fixed-transaction-create',
  templateUrl: './fixed-transaction-create.component.html',
  styleUrl: './fixed-transaction-create.component.scss'
})
export class FixedTransactionCreateComponent implements OnInit{
  
  dataSource = new MatTableDataSource<FixedTransactionDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'name', 'amount'];

  title: string;
  category: Category;

  constructor(
    private fixedTransactionService: FixedTransactionService,
    private toggleEnabledService: ToggleEnabledService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ){}

  /*paginator*/
  length: number;
  pageSize = 25;
  pageIndex = 0;

  hidePageSize = true;

  pageEvent: PageEvent;

  async ngOnInit() {
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
    if(this.category){
      const data = await this.fixedTransactionService.findByCategory(this.category);

      this.dataSource.data = data;
      this.length = data.length;

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  async isActive(id: number){
    await this.toggleEnabledService.isActive(id, true);
    await this.load()
  }
  
  openUpdateDialog(transaction: FixedTransactionDto) {
    const dialogRef = this.dialog.open(DialogFixedTransactionUpdateComponent, {
      data: transaction
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
