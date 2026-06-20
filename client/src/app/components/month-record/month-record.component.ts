import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordService } from '../../service/record.service';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../classes/enums/enums';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-month-record',
  templateUrl: './month-record.component.html',
  styleUrl: './month-record.component.scss'
})
export class MonthRecordComponent implements OnInit{
  
  formSearch: FormGroup;

  constructor(
    private readonly recordService: RecordService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ){
    this.formSearch = this.fb.group({
      search: ['']
    })
  }

  year: number;
  month: number;
  category: string;
  Category = Category;
  isFixed: boolean | null = null;

  displayedColumns: string[] = ['date', 'name', 'category', 'type', 'amount'];
  dataSource = new MatTableDataSource<TransactionTableDto>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /*paginator*/
  length: number;
  pageSize = 20;
  pageIndex = 0;

  hidePageSize = true;

  pageEvent: PageEvent;

  ngOnInit(): void {
    this.year = Number(
      this.route.snapshot.paramMap.get('year')
    );

    this.month = Number(
      this.route.snapshot.paramMap.get('month')
    );

    this.load();

    this.formSearch.get('search')?.valueChanges
    .pipe(
      debounceTime(300), // espera 300ms depois da última tecla
      distinctUntilChanged(), // evita requisições se o valor não mudou
      switchMap(search => this.recordService.filterSearch(this.category, this.isFixed, search, this.year, this.month)) // chama o serviço
    )
    .subscribe((result: TransactionTableDto[]) => {
      this.dataSource.data = result;
      this.length = result.length;
      this.pageIndex = 0;
    });
  }

  async submit() {
    const search = this.formSearch?.get('search')?.value;
    const data = await this.recordService.filterSearch(this.category, this.isFixed, search, this.year, this.month);

    this.dataSource.data = data;
    this.length = data.length;
  }

  async load(){
    this.isFixed = null;
    
    const data = await this.recordService.findOneByMonth(this.year, this.month);

    this.dataSource.data = data;
    this.length = data.length;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    this.category = null;
  }

  async loadIncomes(){
    const search = '';
    this.isFixed = null;
    const data = await this.recordService.filterSearch(Category.INCOME, this.isFixed, search, this.year, this.month)

    this.dataSource.data = data;
    this.length = data.length;
    this.pageIndex = 0;

    this.category = Category.INCOME;
  }

  async loadExpenditures(){
    const search = '';
    this.isFixed = null;
    console.log(this.isFixed)
    const data = await this.recordService.filterSearch(Category.EXPENDITURE, this.isFixed, search, this.year, this.month)

    this.dataSource.data = data;
    this.length = data.length;
    this.pageIndex = 0;

    this.category = Category.EXPENDITURE;
  }

  async filterExpendituresByType(isFixed: boolean){
    const search = ''
    this.isFixed = isFixed;
    console.log(isFixed)
    const data = await this.recordService.filterSearch(Category.EXPENDITURE, isFixed, search, this.year, this.month)

    this.dataSource.data = data;
    this.length = data.length;
    this.pageIndex = 0;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
