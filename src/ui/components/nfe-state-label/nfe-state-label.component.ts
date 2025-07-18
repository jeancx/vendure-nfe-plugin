import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NfeState } from '../../common';

@Component({
    selector: 'nfe-state-label',
    templateUrl: './nfe-state-label.component.html',
    styleUrls: ['./nfe-state-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeStateLabelComponent {
    @Input() state: 'Creating' | NfeState;
    successStates = ['Authorized', 'Corrected'];
    warningStates = ['Denied'];
    errorStates = ['Canceled'];

    getColorType(state: string): string {
        if (this.errorStates.includes(state)) return 'error';
        if (this.successStates.includes(state)) return 'success';
        if (this.warningStates.includes(state)) return 'warning';

        return '';
    }

    getIcon(state: string): string {
        if (this.successStates.includes(state)) return 'success-standard';
        if (this.warningStates.includes(state)) return 'warning-standard';
        if (this.errorStates.includes(state)) return 'error-standard';

        return 'info-standard';
    }
}
