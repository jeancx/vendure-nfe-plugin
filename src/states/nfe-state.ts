import { RequestContext, Transitions } from '@vendure/core';
import { Nfe } from '../entities';

export type NfeState = 'Created' | 'Authorized' | 'Denied' | 'Correcting' | 'Corrected' | 'Canceled';

export const nfeStateTransitions: Transitions<NfeState> = {
    Created: {
        to: ['Authorized', 'Denied'],
    },
    Authorized: {
        to: ['Correcting', 'Canceled'],
    },
    Denied: {
        to: ['Authorized'],
    },
    Correcting: {
        to: ['Corrected', 'Authorized'],
    },
    Corrected: {
        to: ['Correcting', 'Canceled'],
    },
    Canceled: {
        to: [],
    },
};

export interface NfeTransitionData {
    ctx: RequestContext;
    nfe: Nfe;
}
