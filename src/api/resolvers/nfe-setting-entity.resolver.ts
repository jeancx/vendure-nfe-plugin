import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import { Allow, Ctx, ID, ListQueryOptions, Permission, RequestContext, Transaction } from '@vendure/core';

import { NfeSetting } from '../../entities';
import { NfeSettingService } from '../../services';
import {
    MutationCreateNfeSettingCustomArgs,
    MutationCreateNfeSettingPaymentMethodArgs,
    MutationCreateNfeSettingShippingMethodArgs,
    MutationUpdateNfeSettingCustomArgs,
    MutationUpdateNfeSettingPaymentMethodArgs,
    NfeSettingType,
    QueryNfeSettingByTypeAndMethodIdArgs,
    QueryNfeSettingsArgs,
} from '../../types/generated-admin-types';

@Resolver('NfeSetting')
export class NfeSettingEntityResolver {
    constructor(private nfeSettingService: NfeSettingService) {}

    @Query()
    @Allow(Permission.ReadSettings)
    nfeSettings(@Ctx() ctx: RequestContext, @Args() args: QueryNfeSettingsArgs): Promise<PaginatedList<NfeSetting>> {
        return this.nfeSettingService.findAll(ctx, { ...args.options } as ListQueryOptions<NfeSetting>);
    }

    @Query()
    @Allow(Permission.ReadSettings)
    nfeSetting(@Ctx() ctx: RequestContext, @Args() id: ID): Promise<NfeSetting> {
        return this.nfeSettingService.findOne(ctx, id);
    }

    @Query()
    @Allow(Permission.ReadSettings)
    nfeSettingByTypeAndMethodId(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryNfeSettingByTypeAndMethodIdArgs,
    ): Promise<NfeSetting | null> {
        return this.nfeSettingService.findOneByTypeAndMethodId(ctx, args.type, args.id);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async createNfeSettingPaymentMethod(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateNfeSettingPaymentMethodArgs,
    ): Promise<NfeSetting> {
        return this.nfeSettingService.create(ctx, NfeSettingType.PaymentMethod, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async updateNfeSettingPaymentMethod(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateNfeSettingCustomArgs,
    ): Promise<NfeSetting> {
        return await this.nfeSettingService.update(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async createNfeSettingShippingMethod(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateNfeSettingShippingMethodArgs,
    ): Promise<NfeSetting> {
        return this.nfeSettingService.create(ctx, NfeSettingType.ShippingMethod, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async updateNfeSettingShippingMethod(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateNfeSettingPaymentMethodArgs,
    ): Promise<NfeSetting> {
        return await this.nfeSettingService.update(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async createNfeSettingCustom(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationCreateNfeSettingCustomArgs,
    ): Promise<NfeSetting> {
        return this.nfeSettingService.create(ctx, NfeSettingType.Custom, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateSettings)
    async updateNfeSettingCustom(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateNfeSettingCustomArgs,
    ): Promise<NfeSetting> {
        return await this.nfeSettingService.update(ctx, args.input);
    }
}
