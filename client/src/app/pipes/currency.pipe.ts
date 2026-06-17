import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return `R$ ${(value/100).toFixed(2).replace('.', ',')}`;
  }

}
