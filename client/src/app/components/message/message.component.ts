import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { MessageType } from '../../classes/enums/enums';
import { Message } from '../../classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  message: Message;
  MessageType = MessageType;

  @Output()
  onClosed = new EventEmitter<void>()

  close(){
    this.onClosed.emit();
  }

  onAnimationEnd(event: AnimationEvent){
    if(event.animationName.includes('close')){
      this.close();
    }
  }
}
