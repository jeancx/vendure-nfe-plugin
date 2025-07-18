import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'zhf-nfe-form',
    templateUrl: './nfe-form.component.html',
    styleUrls: ['./nfe-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormComponent {
    @Input() nfeFormGroup: FormGroup;

    infoFormGroup(): FormGroup {
        return this.nfeFormGroup.get('info') as FormGroup;
    }

    paymentFormGroup(): FormGroup {
        return this.nfeFormGroup.get('payment') as FormGroup;
    }

    productsFormArray(): FormArray {
        return this.nfeFormGroup.get('products') as FormArray;
    }

    transportFormGroup(): FormGroup {
        return this.nfeFormGroup.get('transport') as FormGroup;
    }

    recipientFormGroup(): FormGroup {
        return this.nfeFormGroup.get('recipient') as FormGroup;
    }
}
