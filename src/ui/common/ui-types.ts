import { ID } from '@vendure/core';
import { NfeSettingData, NfeSettingType } from '../generated-types';

export type JsonData = Record<string, unknown>;

export type NfeState = 'Created' | 'Authorized' | 'Denied' | 'Correcting' | 'Corrected' | 'Canceled';

export type PartialNfeSetting = {
    id?: ID | null | undefined;
    type: NfeSettingType;
    data?: NfeSettingData | JsonData | null | undefined;
    methodId?: ID | null | undefined;
};
