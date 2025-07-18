import { LogLevel } from '@vendure/core';
import { I18nError } from '@vendure/core/dist/i18n/i18n-error';

export class NfeStateTransitionError extends I18nError {
    constructor(fromState: string, toState: string) {
        super('nfe.unable-to-transition-to-state', { fromState, toState }, 'TRANSITION_ERROR', LogLevel.Warn);
    }
}
