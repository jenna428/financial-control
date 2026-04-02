import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';
import { VariableExpenditureService } from '../../service/variable-expentidure.service';
import { MatDialog } from '@angular/material/dialog';
import { VariableExpenditureUpdateComponent } from '../variable-expenditure-update/variable-expenditure-update.component';

@Component({
  selector: 'app-variable-expenditure-create',
  templateUrl: './variable-expenditure-create.component.html',
  styleUrl: './variable-expenditure-create.component.scss'
})
export class VariableExpenditureCreateComponent implements OnInit {

  dataSource: VariableExpenditureDto[] = [];
  displayedColumns: string[] = ['name'];
  constructor(
    private readonly variableExpenditureService: VariableExpenditureService,
    private dialog: MatDialog
  ){}

  form: FormGroup;

  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.dataSource = await this.variableExpenditureService.findAll();
  }

  async openUpdateDialog(transaction: VariableExpenditureDto){
    const dialogRef = this.dialog.open(VariableExpenditureUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
}
