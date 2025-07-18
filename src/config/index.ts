import { RuntimeVendureConfig } from '@vendure/core';

import { customFields } from './customFields';
import { orderOptions } from './orderOptions';

type KeyValues = Record<string, Record<string, any>[]>;

function mergeConfigs(config: RuntimeVendureConfig, configName: string, keyValues: KeyValues): void {
    Object.entries(keyValues).forEach(([key, values]) => {
        config[configName][key].push(...values);
    });
}

export function buildRuntimeConfig(config: RuntimeVendureConfig): RuntimeVendureConfig {
    mergeConfigs(config, 'customFields', customFields);
    mergeConfigs(config, 'orderOptions', orderOptions);

    return config;
}
