import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NfeFormHelper } from '../nfe-form/nfe-form.helper';

@Component({
    selector: 'zhf-nfe-form-payment',
    templateUrl: './nfe-form-payment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormPaymentComponent {
    @Input() paymentFormGroup: FormGroup;

    onMoneyFieldChange(field: string): void {
        console.log(field);
    }

    installments(): FormArray {
        return this.paymentFormGroup.get('parcelas') as FormArray;
    }

    getItem(index: number): FormGroup {
        return this.installments().at(index) as FormGroup;
    }

    addItem(): void {
        this.installments().push(NfeFormHelper.buildProductItem());
    }

    removeItem(i: number): void {
        this.installments().removeAt(i);
    }
}
