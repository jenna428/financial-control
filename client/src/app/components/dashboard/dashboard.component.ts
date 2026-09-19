import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../service/record.service';
import { RecordDto } from '../../dto/record.dto';
import { EChartsOption } from 'echarts';
import { CurrencyPipe } from '../../pipes/currency.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  status: RecordDto;
  data: RecordDto[] = [];
  pieOption: EChartsOption;
  barOption: EChartsOption;
  

  constructor(
    private readonly recordService: RecordService,
  ){}

  ngOnInit(): void {
    this.load();
  }

  async load(){
    this.data = await this.recordService.findAllByYear(this.currentYear);
    this.status = this.data.find( s => { const month = new Date(s.date);return month.getMonth() === this.currentMonth;});

    if (!this.status) {
    return;
    }

    this.pieOption = {
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            {
              value: this.status.totalIncome,
              name: 'Entradas',
              itemStyle: {
                color: '#355A7A'
              }
            },
            { value: this.status.totalExpenditure,
              name: 'Saídas',
              itemStyle: {
                color: '#E8961E'
              }
            }
          ],
          label: {
            fontSize: 20,
            fontFamily: 'Fredoka',
            formatter: '{b}:\n{d}%',
            fontWeight: 'bold'
          },
        }
      ]
    }

    const nomesMeses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ];

    this.barOption = {
      title: {
        text: 'Saldos Finais - ' +  this.currentYear.toString()
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => {
          return this.formatCurrency(Number(value));
        }
      },
      xAxis: {
        type: 'category',
        data: this.data.map(
          item => nomesMeses[new Date(item.date).getMonth()]
        )
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
              return this.formatCurrency(Number(value));
            }
        }
      },
      series: [
        {
          type: 'bar',
          data: this.data.map(item => item.finalBalance),
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => {
              return this.formatCurrency(Number(params.value));
            }
          }
        }
      ]
    }
  }

  formatCurrency(value: number): string {
    return `R$ ${(value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
  }
}
