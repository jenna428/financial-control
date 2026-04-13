import { Component, OnInit } from '@angular/core';
import { TransactionDto } from '../../dto/transaction.dto';
import { TransactionService } from '../../service/transaction.service';
import { TransactionUpdateComponent } from '../transaction-update/transaction-update.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.scss'
})
export class TransactionCreateComponent implements OnInit{

  dataSource: TransactionDto[] = [];
  displayedColumns: string[] = ['amount', 'description', 'despesa','data'];

  constructor(
    private readonly transactionService: TransactionService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.dataSource = await this.transactionService.findAll()
  }

  async openUpdateDialog(transaction: TransactionDto){
    const dialogRef = this.dialog.open(TransactionUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
}
