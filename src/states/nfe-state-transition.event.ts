import { RequestContext, VendureEvent } from '@vendure/core';
import { Nfe } from '../entities';
import { NfeState } from '.';

export class NfeStateTransitionEvent extends VendureEvent {
    constructor(public fromState: NfeState, public toState: NfeState, public ctx: RequestContext, public nfe: Nfe) {
        super();
    }
}
