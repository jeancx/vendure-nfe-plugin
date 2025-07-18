import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import { Allow, Ctx, ID, ListQueryOptions, Permission, RequestContext, Transaction } from '@vendure/core';

import { NfeCompany } from '../../entities';
import { NfeCompanyService } from '../../services';
import {
    MutationCreateNfeCompanyArgs,
    MutationUpdateNfeCompanyArgs,
    QueryNfeCompaniesArgs,
} from '../../types/generated-admin-types';

@Resolver('NfeCompany')
export class NfeCompanyEntityResolver {
    constructor(private nfeCompanyService: NfeCompanyService) {}

    @Query()
    @Allow(Permission.ReadSettings)
    nfeCompanies(@Ctx() ctx: RequestContext, @Args() args: QueryNfeCompaniesArgs): Promise<PaginatedList<NfeCompany>> {
        return this.nfeCompanyService.findAll(ctx, { ...args.options } as ListQueryOptions<NfeCompany>);
    }

    @Query()
    @Allow(Permission.ReadSettings)
    nfeCompany(@Ctx() ctx: RequestContext, @Args() id: ID): Promise<NfeCompany> {
        return this.nfeCompanyService.findOne(ctx, id);
    }

    @Query()
    @Allow(Permission.ReadSettings)
    nfeCompanyByChannel(@Ctx() ctx: RequestContext, @Args() id: ID): Promise<NfeCompany | null> {
        return this.nfeCompanyService.findOneByChannelId(ctx, id);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async createNfeCompany(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateNfeCompanyArgs,
    ): Promise<NfeCompany> {
        return this.nfeCompanyService.create(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async updateNfeCompany(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateNfeCompanyArgs,
    ): Promise<NfeCompany> {
        return await this.nfeCompanyService.update(ctx, args.input);
    }
}
