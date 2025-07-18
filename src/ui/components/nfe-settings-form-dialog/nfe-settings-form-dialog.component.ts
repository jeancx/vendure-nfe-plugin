import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, Dialog } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';

import { PartialNfeSetting } from '../../common';
import { NfeSettingType } from '../../generated-types';
import { GET_PAYMENT_METHOD_LIST, GET_SHIPPING_METHOD_LIST } from './nfe-settings-form-dialog.graphql';

export type Option = { value: string; name: string };

@Component({
    selector: 'zhf-nfe-settings-form-dialog.component',
    templateUrl: './nfe-settings-form-dialog.component.html',
    styleUrls: ['./nfe-settings-form-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeSettingsFormDialogComponent implements Dialog<PartialNfeSetting>, OnInit {
    nfeSetting: PartialNfeSetting;
    resolveWith: (result?: PartialNfeSetting) => void;
    formGroup: FormGroup;
    codeOptions$: Observable<Option[]>;

    constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

    isType(type: string): boolean {
        return this.nfeSetting.type === (type as NfeSettingType);
    }

    ngOnInit(): void {
        if (this.isType(NfeSettingType.PaymentMethod)) {
            this.getPaymentMethods();
            this.buildPaymentMethodForm();
        } else if (this.isType(NfeSettingType.ShippingMethod)) {
            this.getShippingMethods();
            this.buildShippingMethodForm();
        } else if (this.isType(NfeSettingType.Custom)) {
            this.buildCustomForm();
        }

        this.formGroup.patchValue(this.nfeSetting.data || {});
    }

    getPaymentMethods(): void {
        this.codeOptions$ = this.dataService
            .query<Record<string, any>>(GET_PAYMENT_METHOD_LIST)
            .mapStream(stream => stream.paymentMethods.items.map(item => ({ value: item.id, name: item.code })));
    }

    getShippingMethods(): void {
        this.codeOptions$ = this.dataService
            .query<Record<string, any>>(GET_SHIPPING_METHOD_LIST)
            .mapStream(stream => stream.shippingMethods.items.map(item => ({ value: item.id, name: item.name })));
    }

    setMethodId(id: string): void {
        this.nfeSetting.methodId = id;
    }

    private buildPaymentMethodForm(): void {
        this.formGroup = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            pagamento: ['', Validators.required],
            forma_pagamento: [''],
            tipo_integracao: ['', Validators.required],
            cnpj_credenciadora: [''],
        });
    }

    private buildShippingMethodForm(): void {
        this.formGroup = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            cnpj: [''],
            razao_social: [''],
            ie: [''],
            cpf: [''],
            nome_completo: [''],
            endereco: [''],
            uf: [''],
            cidade: [''],
            cep: [''],
            placa: [''],
            uf_veiculo: [''],
            rntc: [''],
            reboque: this.formBuilder.group({
                placa: [''],
                uf_veiculo: [''],
                rntc: [''],
                vagao: [''],
                balsa: [''],
            }),
        });
    }

    private buildCustomForm(): void {
        this.formGroup = this.formBuilder.group({
            set: this.formBuilder.array([this.buildCustomItem()]),
        });
    }

    private buildCustomItem(): FormGroup {
        return this.formBuilder.group({
            key: ['', Validators.required],
            value: ['', Validators.required],
        });
    }

    private customSetItems(): FormArray {
        return this.formGroup.get('set') as FormArray;
    }

    private addCustomItem(): void {
        this.customSetItems().push(this.buildCustomItem());
    }

    private removeCustomItem(index: number): void {
        this.customSetItems().removeAt(index);
    }

    canSubmit(): boolean {
        return this.formGroup.invalid || this.formGroup.pristine;
    }

    cancel(): void {
        this.resolveWith();
    }

    submit(): void {
        this.resolveWith({ ...this.nfeSetting, data: this.formGroup.value });
    }
}
