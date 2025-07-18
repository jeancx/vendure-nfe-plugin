import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

import { nfeAdminApiExtension, nfeShopApiExtension } from './api/extensions';
import {
    NfeCompanyEntityResolver,
    NfeEntityResolver,
    NfeSettingEntityResolver,
    OrderNfeEntityResolver,
    OrderEntityResolver,
} from './api/resolvers';
import { PLUGIN_INIT_OPTIONS } from './constants';
import { Nfe, NfeCompany, NfeOperation, NfeProduct, NfeSetting } from './entities';
import { NfeCompanyService, NfeProductService, NfeService, NfeSettingService } from './services';
import { NfeStateMachine } from './states';
import { PluginInitOptions } from './types';
import { buildRuntimeConfig } from './config';

/**
 * NF-e plugin for Vendure Ecommerce.
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [Nfe, NfeProduct, NfeOperation, NfeCompany, NfeSetting],
    adminApiExtensions: {
        schema: nfeAdminApiExtension,
        resolvers: [
            NfeCompanyEntityResolver,
            NfeEntityResolver,
            NfeSettingEntityResolver,
            OrderNfeEntityResolver,
            OrderEntityResolver,
        ],
    },
    shopApiExtensions: {
        schema: nfeShopApiExtension,
        resolvers: [OrderEntityResolver],
    },
    providers: [
        NfeCompanyService,
        NfeProductService,
        NfeService,
        NfeSettingService,
        NfeStateMachine,
        { provide: PLUGIN_INIT_OPTIONS, useFactory: () => NfePlugin.options },
    ],
    configuration: buildRuntimeConfig,
    compatibility: '^2.0.0',
})
export class NfePlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): NfePlugin {
        this.options = options;
        return NfePlugin;
    }

    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'ui-shared.module.ts',
                ngModuleName: 'NfeUiSharedModule',
            },
            {
                type: 'lazy' as const,
                route: 'nfe',
                ngModuleFileName: 'ui-lazy.module.ts',
                ngModuleName: 'NfeUiLazyModule',
            },
        ],
        translations: {
            en_US: path.join(__dirname, 'i18n/en-US.json'),
            pt_BR: path.join(__dirname, 'i18n/pt-BR.json'),
        },
    };
}
