import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../service/record.service';
import { TransactionTableDto } from '../../dto/transaction-table.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../classes/enums/enums';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

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

  displayedColumns: string[] = ['date', 'name', 'category', 'type', 'amount'];
  dataSource: TransactionTableDto[] = [];

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
      switchMap(search => this.recordService.filterSearch(this.category, search, this.year, this.month)) // chama o serviço
    )
    .subscribe((result: TransactionTableDto[]) => {
      this.dataSource = result;
    });
  }

  async submit() {
    const search = this.formSearch?.get('search')?.value;
    this.dataSource = await this.recordService.filterSearch(this.category, search, this.year, this.month);
  }

  async load(){
    this.dataSource = await this.recordService.findOneByMonth(this.year, this.month);
    this.category = null;
  }

  async loadIncomes(){
    this.dataSource = await this.recordService.filterCategory(Category.INCOME, this.year, this.month)
    this.category = Category.INCOME;
  }

  async loadExpenditures(){
    this.dataSource = await this.recordService.filterCategory(Category.EXPENDITURE, this.year, this.month)
    this.category = Category.EXPENDITURE;
  }
}
