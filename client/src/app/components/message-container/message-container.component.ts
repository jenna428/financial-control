import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss'
})
export class MessageContainerComponent implements OnInit{

  @ViewChild('message', {read: ViewContainerRef})
  container: ViewContainerRef;

  constructor(
    private readonly messageService: MessageService
  ){}

  ngOnInit(): void {
    this.messageService.onMessage.subscribe(m => {

      const ref = this.container.createComponent(MessageComponent);
      ref.instance.message = m;

      ref.instance.onClosed.asObservable().subscribe(() => {
        ref.destroy()
      });
    })
  }
}
