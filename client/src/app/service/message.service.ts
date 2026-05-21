import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "../classes/message";
import { MessageType } from "../classes/enums/enums";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private subject = new Subject<Message>();
    public onMessage = this.subject.asObservable();

    showError(text: string){
        this.show(text, MessageType.ERROR);  
    }

    showSuccess(text: string){
        this.show(text, MessageType.SUCCESS);  
    }

    private show(text: string, type: MessageType) {
        this.subject.next({
            text: text,
            type: type
        });
    }
}