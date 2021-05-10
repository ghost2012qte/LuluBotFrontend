import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { iError } from 'src/interfaces/frontend-interfaces';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {

    @Input() error: iError;

}