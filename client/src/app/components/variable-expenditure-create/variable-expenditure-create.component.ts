import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';
import { VariableExpenditureService } from '../../service/variable-expentidure.service';
import { MatDialog } from '@angular/material/dialog';
import { ToggleEnabledService } from '../../service/toggle-enabled.service';
import { DialogVariableExpenditureUpdateComponent } from '../dialogs/dialog-variable-expenditure-update/dialog-variable-expenditure-update.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-variable-expenditure-create',
  templateUrl: './variable-expenditure-create.component.html',
  styleUrl: './variable-expenditure-create.component.scss'
})
export class VariableExpenditureCreateComponent implements OnInit {

  dataSource = new MatTableDataSource<VariableExpenditureDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['name'];
  
  constructor(
    private readonly variableExpenditureService: VariableExpenditureService,
    private dialog: MatDialog,
    private toggleEnabledService: ToggleEnabledService,
  ){}

  form: FormGroup;

  /*paginator*/
  length: number;
  pageSize = 25;
  pageIndex = 0;

  hidePageSize = true;

  pageEvent: PageEvent;


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

  //paginator
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

}
