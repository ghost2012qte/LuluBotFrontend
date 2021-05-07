import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SubKeeper } from '../@helpers/sub-keeper';

@Directive({
    selector: 'input[appOnKeyPressed]'
})
export class OnKeyPressedDirective implements OnDestroy {

    @Input()
    appOnKeyPressed: string;

    @Output()
    keypressed = new EventEmitter<KeyboardEvent>();

    subs = new SubKeeper();

    constructor(ref: ElementRef<HTMLInputElement>) {
        this.subs.plus = fromEvent<KeyboardEvent>(ref.nativeElement, 'keyup').subscribe(e => {
            if (e.key == this.appOnKeyPressed) {
                this.keypressed.emit(e);
            }
        })
    }

    ngOnDestroy() {
        this.subs.unsubAll();
    }

}