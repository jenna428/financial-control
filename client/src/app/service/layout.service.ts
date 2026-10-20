import { HostListener, Injectable} from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    private _width: number = window.innerWidth;

    private _hiddenMenu: boolean = true;

    public get hiddenMenu(): boolean {
        return this._hiddenMenu;
    }

    // public sideNavHidden = new Subject<boolean>(); // enviar a informação para os inscritos: this.layoutService.sideNavHidden.next(this.hiddenMenu // valor qualquer);
    // Como se inscrever:
    // this.layoutService.sideNavHidden.subscribe(h => {
    //   this.hiddenMenu = h;
    // });
    
    public get width(): number {
        return this._width;
    }

    public get isMobile(): boolean {
        return this.width <= 768;
    }

    constructor() {
        window.onresize = () => {
            this._width = window.innerWidth;
        };
    }

    toggleHiddenMenu() {
        this._hiddenMenu = !this._hiddenMenu;
    }
}