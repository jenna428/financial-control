import { Component, OnInit } from '@angular/core';
import { RecordDto } from '../../dto/record.dto';
import { RecordService } from '../../service/record.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent implements OnInit {

  displayedColumns: string[] = ['date', 'totI', 'totE', 'finalB'];
  dataSource: RecordDto[] = [];
  currentYear: number = new Date().getFullYear();

  constructor(
    private readonly recordService: RecordService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.dataSource = await this.recordService.findAllByYear(this.currentYear);
  }

  openMonth(element: RecordDto){
    const date = new Date(element.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    this.router.navigate(['/pecunia/record-month', year, month])
  }
}
