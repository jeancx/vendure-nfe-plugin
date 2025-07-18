import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Allow, Ctx, ID, Permission, RequestContext, Transaction } from '@vendure/core';

import { Nfe } from '../../entities';
import { NfeService } from '../../services';
import { MutationCreateOrderNfeArgs, MutationUpdateOrderNfeArgs } from '../../types/generated-admin-types';

@Resolver('Nfe')
export class OrderNfeEntityResolver {
    constructor(private nfeService: NfeService) {}

    @Query()
    @Allow(Permission.ReadOrder)
    async orderNfe(@Ctx() ctx: RequestContext, @Args() id: ID): Promise<Nfe> {
        return this.nfeService.findOne(ctx, id);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async createOrderNfe(@Ctx() ctx: RequestContext, @Args() args: MutationCreateOrderNfeArgs): Promise<Nfe> {
        return this.nfeService.create(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async updateOrderNfe(@Ctx() ctx: RequestContext, @Args() args: MutationUpdateOrderNfeArgs): Promise<Nfe> {
        return await this.nfeService.update(ctx, args.input);
    }
}
