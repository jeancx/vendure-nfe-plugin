import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import { Ctx, RequestContext, ApiType, Api, ListQueryBuilder, Order, ListQueryOptions } from '@vendure/core';

import { Nfe } from '../../entities';
import { OrderNfesArgs } from '../../types/generated-shop-types';

@Resolver('Order')
export class OrderEntityResolver {
    constructor(private listQueryBuilder: ListQueryBuilder) {}

    @ResolveField()
    nfes(
        @Ctx() ctx: RequestContext,
        @Api() apiType: ApiType,
        @Parent() order: Order,
        @Args() args: OrderNfesArgs,
    ): Promise<PaginatedList<Nfe>> {
        const publicOnly = apiType === 'shop';
        return this.listQueryBuilder
            .build(Nfe, { ...args.options } as ListQueryOptions<Nfe>, {
                where: { order: { id: order.id }, ...(publicOnly ? { isPublic: true } : {}) },
                relations: ['order'],
            })
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }
}
