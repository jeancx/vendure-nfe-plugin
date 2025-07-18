import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dialog } from '@vendure/admin-ui/core';
import { NfeProductInput } from '../../generated-types';
import { NfeFormHelper } from '../nfe-form/nfe-form.helper';

@Component({
    selector: 'zhf-nfe-form-product-taxes-dialog',
    templateUrl: './nfe-form-product-taxes-dialog.component.html',
    styleUrls: ['./nfe-form-product-taxes-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormProductTaxesDialogComponent implements Dialog<NfeProductInput>, OnInit {
    product: NfeProductInput;
    resolveWith: (result?: NfeProductInput) => void;
    productFormGroup: FormGroup;

    ngOnInit(): void {
        this.productFormGroup = NfeFormHelper.buildProductItem();
        this.productFormGroup.patchValue(this.product);
    }

    onMoneyFieldChange(field: string): void {
        console.log(field);
    }

    isManualTax(): boolean {
        const taxClass = this.productFormGroup.get('info')?.get('classe_imposto')?.value;

        return taxClass && taxClass === 'manual';
    }

    specificDetailing(type: string): boolean {
        const specificDetailing = this.productFormGroup.get('info')?.get('detalhamento_especifico')?.value;

        return (!specificDetailing && type === 'nenhum') || specificDetailing === type;
    }

    canSubmit(): boolean {
        return this.productFormGroup.invalid || this.productFormGroup.pristine;
    }

    cancel(): void {
        this.resolveWith();
    }

    submit(): void {
        this.resolveWith(this.productFormGroup.value);
    }
}
