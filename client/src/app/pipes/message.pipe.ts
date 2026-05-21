import { Pipe, PipeTransform } from '@angular/core';
import { MessageType } from '../classes/enums/enums';

@Pipe({
  name: 'message'
})
export class MessagePipe implements PipeTransform {

  transform(type: MessageType): string {
    switch(type){
      case MessageType.ERROR:
        return 'report';
      case MessageType.SUCCESS:
        return 'check_circle';
      default:
        return '';
    }
  }

}
