import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';

import { FormFieldControlDirective } from './common';
import {
    FormFieldComponent,
    FormFieldSelectStateComponent,
    NfeCompanyDetailComponent,
    NfeCompanyListComponent,
    NfeFormComponent,
    NfeFormInfoComponent,
    NfeFormPaymentComponent,
    NfeFormProductsComponent,
    NfeFormProductTaxesDialogComponent,
    NfeFormRecipientComponent,
    NfeFormTransportComponent,
    NfeSettingsComponent,
    NfeSettingsFormDialogComponent,
    NfeStateLabelComponent,
    OrderNfeDetailComponent,
    OrderNfeListComponent,
} from './components';
import { nfeUiRoutes } from './ui.routes';
import { NfeCompanyDetailResolver, OrderNfeDetailResolver, OrderNfeListResolver } from './providers';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
    imports: [SharedModule, RouterModule.forChild(nfeUiRoutes)],
    declarations: [
        FormFieldComponent,
        FormFieldControlDirective,
        FormFieldSelectStateComponent,
        NfeCompanyDetailComponent,
        NfeCompanyListComponent,
        NfeFormComponent,
        NfeFormInfoComponent,
        NfeFormPaymentComponent,
        NfeFormProductsComponent,
        NfeFormProductTaxesDialogComponent,
        NfeFormRecipientComponent,
        NfeFormTransportComponent,
        NfeSettingsComponent,
        NfeSettingsFormDialogComponent,
        NfeStateLabelComponent,
        OrderNfeDetailComponent,
        OrderNfeListComponent,
        FormFieldSelectStateComponent,
    ],
    exports: [
        NfeStateLabelComponent,
        NfeFormComponent,
        NfeFormInfoComponent,
        NfeFormPaymentComponent,
        NfeFormProductTaxesDialogComponent,
        NfeFormProductsComponent,
        NfeFormRecipientComponent,
        NfeSettingsFormDialogComponent,
        NfeFormTransportComponent,
    ],
    providers: [
        OrderNfeListResolver,
        OrderNfeDetailResolver,
        NfeCompanyDetailResolver,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
    ],
})
export class NfeUiLazyModule {}
