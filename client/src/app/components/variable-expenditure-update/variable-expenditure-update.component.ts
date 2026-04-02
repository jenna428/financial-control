import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';

@Component({
  selector: 'app-variable-expenditure-update',
  templateUrl: './variable-expenditure-update.component.html',
  styleUrl: './variable-expenditure-update.component.scss'
})
export class VariableExpenditureUpdateComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: VariableExpenditureDto,   
  ) {}

  ngOnInit(): void {
    
  }
}
