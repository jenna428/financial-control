import { Component, OnInit } from '@angular/core';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { FixedTransactionUpdateComponent } from '../fixed-transaction-update/fixed-transaction-update.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fixed-transaction-create',
  templateUrl: './fixed-transaction-create.component.html',
  styleUrl: './fixed-transaction-create.component.scss'
})
export class FixedTransactionCreateComponent implements OnInit{
  dataSource: FixedTransactionDto[] = [];
  displayedColumns: string[] = ['name', 'amount'];

  title: string;
  category: Category;

  constructor(
    private fixedTransactionService: FixedTransactionService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ){}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async p => {
      await this.onCategoryChange();
    })
  }

  async onCategoryChange() { // colocar aqui coisas que será carregado na criação do componente
    this.category = this.activatedRoute.snapshot.paramMap.get('category') as Category;

    this.title = this.category === Category.INCOME 
      ? 'Adicionar Receita'
      : 'Adicionar Despesa';

    await this.load();  
  }

  async load(){
    if(this.category){
        this.dataSource = await this.fixedTransactionService.findByCategory(this.category);
      }
  }
  
  openUpdateDialog(transaction: FixedTransactionDto) {
    const dialogRef = this.dialog.open(FixedTransactionUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
}
