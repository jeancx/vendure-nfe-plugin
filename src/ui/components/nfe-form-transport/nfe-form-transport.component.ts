import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'zhf-nfe-form-transport',
    templateUrl: './nfe-form-transport.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormTransportComponent {
    @Input() transportFormGroup: FormGroup;

    onMoneyFieldChange(field: string): void {
        console.log(field);
    }
}
