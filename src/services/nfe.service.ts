import { Injectable } from '@nestjs/common';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import {
    EventBus,
    ID,
    ListQueryBuilder,
    ListQueryOptions,
    patchEntity,
    RequestContext,
    TransactionalConnection,
} from '@vendure/core';

import { Nfe, NfeOperation } from '../entities';
import { getEmitter } from '../nfe-emitters/get-emitter';
import { NfeEmitter } from '../nfe-emitters/nfe-emitter.interface';
import { NfeState, NfeStateMachine, NfeStateTransitionError, NfeStateTransitionEvent } from '../states';
import { CreateNfeInput, NfeOperationResponse, NfeOperationType, UpdateNfeInput } from '../types/generated-admin-types';
import { NfeCompanyService, NfeProductService } from '.';

type TransictionCallbackResult = {
    success: boolean;
    failedState?: NfeState;
    response: NfeOperationResponse;
    nfe: Nfe;
    nfeOperation: NfeOperation;
};

interface OnCanTransictionCallback {
    (nfeEmitter: NfeEmitter, nfe: Nfe): Promise<TransictionCallbackResult>;
}

@Injectable()
export class NfeService {
    private nfeCompanyService: NfeCompanyService;
    private nfeProductService: NfeProductService;
    private readonly relations = [
        'products',
        'products.orderLine',
        'products.orderLine.items',
        'company',
        'order',
        'lastOperation',
        'operations',
    ];

    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
        private eventBus: EventBus,
        private nfeStateMachine: NfeStateMachine,
    ) {
        this.nfeCompanyService = new NfeCompanyService(connection, listQueryBuilder);
        this.nfeProductService = new NfeProductService(connection);
    }

    findOne(ctx: RequestContext, id: ID): Promise<Nfe> {
        return this.connection.getRepository(ctx, Nfe).findOneOrFail({ where: { id }, relations: this.relations });
    }

    orderNfes(ctx: RequestContext, orderId: ID, options: ListQueryOptions<Nfe>): Promise<PaginatedList<Nfe>> {
        return this.listQueryBuilder
            .build(Nfe, options as ListQueryOptions<Nfe>, { ctx, relations: ['order'] })
            .where({ orderId })
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }

    async create(ctx: RequestContext, input: CreateNfeInput): Promise<Nfe> {
        const company = await this.nfeCompanyService.findOneByChannelId(ctx, ctx.channelId);
        const initialState = this.nfeStateMachine.getInitialState();

        if (!company) throw new Error('Empresa não Encontrada!');

        const nfe = new Nfe({ ...input, state: initialState, products: [], company });

        await this.save(ctx, nfe, true);

        for (const product of input.products || []) {
            await this.nfeProductService.create(ctx, product, nfe);
        }

        return this.findOne(ctx, nfe.id);
    }

    async update(ctx: RequestContext, input: UpdateNfeInput): Promise<Nfe> {
        const nfe = await this.findOne(ctx, input.id);
        const updatedNfe = patchEntity(nfe, {
            info: input.info,
            payment: input.payment,
            recipient: input.recipient,
            transport: input.transport,
            exportation: input.exportation,
            references: input.references,
        });

        return this.save(ctx, updatedNfe, true);
    }

    async emitNfe(ctx: RequestContext, id: ID): Promise<NfeOperationResponse> {
        return this.startTransitionToStateOrThrow(ctx, id, 'Authorized', async (nfeEmitter, nfe) => {
            console.log(nfe);
            return await nfeEmitter.emitNFe(nfe).then(response => {
                console.log(response);
                nfe.series = response.serie;
                nfe.number = response.numero;
                nfe.receipt = response.recibo;
                nfe.key = response.chave;
                nfe.xml = response.xml;
                nfe.danfe = response.danfe;

                const nfeOperationInput = {
                    env: nfe.env,
                    type: NfeOperationType.Emission,
                    response: response,
                    nfe: nfe,
                    info: {
                        operacao: nfe.info.operacao,
                        natureza_operacao: nfe.info.natureza_operacao,
                    },
                };

                const nfeOperation = nfe.lastOperation
                    ? patchEntity(nfe.lastOperation, nfeOperationInput)
                    : new NfeOperation(nfeOperationInput);

                return { success: response.status === 'aprovado', nfe, nfeOperation, response };
            });
        });
    }

    correctingNfe(ctx: RequestContext, id: ID): Promise<NfeOperationResponse> {
        return this.emitNfe(ctx, id);
    }

    emitNfeCorrectionLetter(ctx: RequestContext, id: ID): Promise<NfeOperationResponse> {
        return this.emitNfe(ctx, id);
    }

    cancelNfe(ctx: RequestContext, id: ID): Promise<NfeOperationResponse> {
        return this.emitNfe(ctx, id);
    }

    async startTransitionToStateOrThrow(
        ctx: RequestContext,
        id: ID,
        toState: NfeState,
        onCanTransictionCallback: OnCanTransictionCallback,
    ): Promise<NfeOperationResponse> {
        const nfe = await this.findOne(ctx, id);
        const fromState = nfe.state;
        let response: NfeOperationResponse = nfe.lastOperation?.response || {};

        if (this.nfeStateMachine.canTransition(nfe.state, toState)) {
            await this.nfeStateMachine
                .transition(ctx, nfe, toState)
                .then(async () => {
                    const nfeEmitter = getEmitter(nfe.company);

                    await onCanTransictionCallback(nfeEmitter, nfe).then(async result => {
                        await this.connection.getRepository(ctx, NfeOperation).save(result.nfeOperation);
                        nfe.lastOperation = result.nfeOperation;
                        response = result.response;

                        if (!result.success) {
                            nfe.state = result.failedState || fromState;
                        } else {
                            this.eventBus.publish(new NfeStateTransitionEvent(fromState, toState, ctx, nfe));
                        }

                        await this.save(ctx, nfe);
                    });
                })
                .catch(error => {
                    console.log(error);
                    throw new NfeStateTransitionError(fromState, toState);
                });
        } else {
            throw new NfeStateTransitionError(fromState, toState);
        }

        return response;
    }

    private save(ctx: RequestContext, nfe: Nfe, reload = false): Promise<Nfe> {
        return this.connection.getRepository(ctx, Nfe).save(nfe, { reload });
    }
}
