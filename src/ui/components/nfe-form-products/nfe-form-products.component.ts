import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalService } from '@vendure/admin-ui/core';
import { NfeFormProductTaxesDialogComponent } from '../nfe-form-product-taxes-dialog/nfe-form-product-taxes-dialog.component';
import { NfeFormHelper } from '../nfe-form/nfe-form.helper';

@Component({
    selector: 'zhf-nfe-form-products',
    templateUrl: './nfe-form-products.component.html',
    styleUrls: ['./nfe-form-products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeFormProductsComponent {
    @Input() productsFormArray: FormArray;

    constructor(private modalService: ModalService) {}

    getParentFormGroup(): FormGroup {
        return this.productsFormArray.parent as FormGroup;
    }

    items(): FormArray {
        return this.productsFormArray;
    }

    getItem(index: number): FormGroup {
        return this.productsFormArray.at(index) as FormGroup;
    }

    addItem(): void {
        this.productsFormArray.push(NfeFormHelper.buildProductItem());
    }

    removeItem(i: number): void {
        this.productsFormArray.removeAt(i);
    }

    productTaxes(i: number): void {
        this.modalService
            .fromComponent(NfeFormProductTaxesDialogComponent, {
                size: 'xl',
                closable: true,
                locals: { product: this.getItem(i).value },
            })
            .subscribe(result => {
                if (result) {
                    this.getItem(i).patchValue(result);
                }
            });
    }

    onMoneyFieldChange(field: string): void {
        console.log(field);
    }
}
