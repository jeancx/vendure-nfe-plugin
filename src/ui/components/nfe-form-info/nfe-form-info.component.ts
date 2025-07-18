import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'zhf-nfe-form-info',
    templateUrl: './nfe-form-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormInfoComponent {
    @Input() infoFormGroup: FormGroup;

    onMoneyFieldChange(field: string): void {
        console.log(field);
    }
}
