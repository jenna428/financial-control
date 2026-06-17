import { Component, OnInit } from '@angular/core';
import { Category } from '../../classes/enums/enums';
import { FixedTransactionDto } from '../../dto/fixed-transaction.dto';
import { FixedTransactionService } from '../../service/fixed-transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToggleEnabledService } from '../../service/toggle-enabled.service';
import { DialogFixedTransactionUpdateComponent } from '../dialogs/dialog-fixed-transaction-update/dialog-fixed-transaction-update.component';

@Component({
  selector: 'app-fixed-transaction-create',
  templateUrl: './fixed-transaction-create.component.html',
  styleUrl: './fixed-transaction-create.component.scss'
})
export class FixedTransactionCreateComponent implements OnInit{
  dataSource: FixedTransactionDto[] = [];
  displayedColumns: string[] = ['date', 'name', 'amount'];

  title: string;
  category: Category;

  constructor(
    private fixedTransactionService: FixedTransactionService,
    private toggleEnabledService: ToggleEnabledService,
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
      : 'Adicionar Despesa Fixa';

    await this.load();  
  }

  async load(){
    if(this.category){
      this.dataSource = await this.fixedTransactionService.findByCategory(this.category);
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
}
