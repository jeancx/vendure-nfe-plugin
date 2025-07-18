import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Allow, Ctx, ID, Permission, RequestContext, Transaction } from '@vendure/core';

import { NfeService } from '../../services';
import { NfeOperationResponse } from '../../types/generated-admin-types';

@Resolver('Nfe')
export class NfeEntityResolver {
    constructor(private nfeService: NfeService) {}

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async emitNfe(@Ctx() ctx: RequestContext, @Args() args: { id: ID }): Promise<NfeOperationResponse> {
        return await this.nfeService.emitNfe(ctx, args.id);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async cancelNfe(@Ctx() ctx: RequestContext, @Args() args: { id: ID }): Promise<NfeOperationResponse> {
        return await this.nfeService.cancelNfe(ctx, args.id);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async emitNfeCorrectionLetter(@Ctx() ctx: RequestContext, @Args() args: { id: ID }): Promise<NfeOperationResponse> {
        return await this.nfeService.emitNfe(ctx, args.id);
    }
}
