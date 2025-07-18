import { FSM, IllegalOperationError, RequestContext, StateMachineConfig } from '@vendure/core';
import { Nfe } from '../entities';
import { NfeState, nfeStateTransitions, NfeTransitionData } from '.';

export class NfeStateMachine {
    private readonly config: StateMachineConfig<NfeState, NfeTransitionData>;
    private readonly initialState: NfeState = 'Created';

    constructor() {
        this.config = this.initConfig();
    }

    getInitialState(): NfeState {
        return this.initialState;
    }

    canTransition(currentState: NfeState, newState: NfeState): boolean {
        return new FSM(this.config, currentState).canTransitionTo(newState);
    }

    getNextStates(nfe: Nfe): readonly NfeState[] {
        const fsm = new FSM(this.config, nfe.state);
        return fsm.getNextStates();
    }

    async transition(ctx: RequestContext, nfe: Nfe, state: NfeState): Promise<void> {
        const fsm = new FSM(this.config, nfe.state);
        await fsm.transitionTo(state, { ctx, nfe });
        nfe.state = state;
    }

    /**
     * Specific business logic to be executed on Payment state transitions.
     */
    private async onTransitionStart(fromState: NfeState, toState: NfeState, data: NfeTransitionData): Promise<void> {
        /**/
    }

    private async onTransitionEnd(fromState: NfeState, toState: NfeState, data: NfeTransitionData): Promise<void> {
        /**/
    }

    private initConfig(): StateMachineConfig<NfeState, NfeTransitionData> {
        return {
            transitions: nfeStateTransitions,
            onTransitionStart: async (fromState, toState, data) => {
                return this.onTransitionStart(fromState, toState, data);
            },
            onTransitionEnd: async (fromState, toState, data) => {
                await this.onTransitionEnd(fromState, toState, data);
            },
            onError: async (fromState, toState, message) => {
                throw new IllegalOperationError(message || '', {
                    fromState,
                    toState,
                });
            },
        };
    }
}
