import { defaultOrderProcess } from '@vendure/core';

export const orderOptions = {
    process: [
        defaultOrderProcess,
        {
            transitions: {
                PaymentSettled: {
                    to: ['NfeEmit'],
                    mergeStrategy: 'replace',
                },
                NfeEmit: {
                    to: ['PartiallyShipped', 'Shipped'],
                },
            },
        },
    ],
};
