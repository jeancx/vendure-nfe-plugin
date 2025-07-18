import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, ModalService } from '@vendure/admin-ui/core';
import { ID } from '@vendure/core';
import { PartialNfeSetting } from '../../common';

import {
    CreateNfeSettingShippingMethodInput,
    CreateNfeSettingShippingMethodMutation,
    CreateNfeSettingShippingMethodMutationVariables,
    GetNfeSetting,
    GetNfeSettings,
    NfeSettingType,
    UpdateNfeSettingShippingMethodInput,
    UpdateNfeSettingShippingMethodMutation,
    UpdateNfeSettingShippingMethodMutationVariables,
} from '../../generated-types';
import { NfeSettingsFormDialogComponent } from '../nfe-settings-form-dialog/nfe-settings-form-dialog.component';
import {
    CREATE_NFE_SETTING_SHIPPING_METHOD,
    GET_NFE_SETTING,
    GET_NFE_SETTING_LIST,
    UPDATE_NFE_SETTING_SHIPPING_METHOD,
} from './nfe-settings.graphql';

@Component({
    selector: 'zhf-nfe-settings',
    templateUrl: './nfe-settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeSettingsComponent extends BaseListComponent<GetNfeSettings.Query, GetNfeSettings.Items> {
    private type: NfeSettingType = NfeSettingType.PaymentMethod;

    constructor(
        private dataService: DataService,
        router: Router,
        route: ActivatedRoute,
        private modalService: ModalService,
    ) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => this.dataService.query(GET_NFE_SETTING_LIST, args),
            data => data.nfeSettings,
            (skip, take) => {
                return {
                    options: {
                        skip,
                        take,
                        filter: { type: { eq: this.type } },
                        sort: {},
                    },
                };
            },
        );
    }

    setType(type: string): void {
        this.type = type as NfeSettingType;
        this.refresh();
    }

    isType(type: string): boolean {
        return this.type === (type as NfeSettingType);
    }

    async openDataModal(id?: string): Promise<void> {
        const nfeSetting = id
            ? await this.dataService
                  .query<GetNfeSetting.Query, GetNfeSetting.Variables>(GET_NFE_SETTING, { id })
                  .mapSingle(item => item.nfeSetting)
                  .toPromise()
            : { type: this.type };

        if (nfeSetting) {
            this.modalService
                .fromComponent(NfeSettingsFormDialogComponent, {
                    size: this.isType('ShippingMethod') ? 'xl' : 'lg',
                    closable: true,
                    locals: { nfeSetting },
                })
                .subscribe(async result => {
                    if (result && !id) await this.createNfeSetting(result);
                    if (result && id) await this.updateNfeSetting(id, result);
                });
        }
    }

    async createNfeSetting(nfeSetting: PartialNfeSetting): Promise<void> {
        const input = { type: this.type, data: nfeSetting.data, methodId: nfeSetting.methodId };

        if (this.isType('ShippingMethod')) {
            this.dataService.mutate<
                CreateNfeSettingShippingMethodMutation,
                CreateNfeSettingShippingMethodMutationVariables
            >(CREATE_NFE_SETTING_SHIPPING_METHOD, { input: input as CreateNfeSettingShippingMethodInput });
        }
    }

    async updateNfeSetting(id: ID, nfeSetting: PartialNfeSetting): Promise<void> {
        const input = { id: id, type: this.type, data: nfeSetting.data, methodId: nfeSetting.methodId };

        if (this.isType('ShippingMethod') && id) {
            this.dataService.mutate<
                UpdateNfeSettingShippingMethodMutation,
                UpdateNfeSettingShippingMethodMutationVariables
            >(UPDATE_NFE_SETTING_SHIPPING_METHOD, { input: input as UpdateNfeSettingShippingMethodInput });
        }
    }
}
