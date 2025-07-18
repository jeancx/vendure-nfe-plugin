import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'zhf-nfe-form-recipient',
    templateUrl: './nfe-form-recipient.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormRecipientComponent {
    @Input() recipientFormGroup: FormGroup;

    onMoneyFieldChange(field: string): void {
        console.log(field);
    }
}
