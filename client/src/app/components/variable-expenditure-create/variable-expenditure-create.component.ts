import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';
import { VariableExpenditureService } from '../../service/variable-expentidure.service';
import { MatDialog } from '@angular/material/dialog';
import { ToggleEnabledService } from '../../service/toggle-enabled.service';
import { DialogVariableExpenditureUpdateComponent } from '../dialogs/dialog-variable-expenditure-update/dialog-variable-expenditure-update.component';

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
    private dialog: MatDialog,
    private toggleEnabledService: ToggleEnabledService,
  ){}

  form: FormGroup;

  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.dataSource = await this.variableExpenditureService.findAll();
  }

  async isActive(id: number){
    await this.toggleEnabledService.isActive(id, false);
    await this.load()
  }

  async openUpdateDialog(transaction: VariableExpenditureDto){
    const dialogRef = this.dialog.open(DialogVariableExpenditureUpdateComponent, {
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
}
