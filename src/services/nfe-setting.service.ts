import { Injectable } from '@nestjs/common';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import { DeepPartial, ID, ListQueryBuilder, ListQueryOptions, patchEntity, RequestContext, TransactionalConnection } from '@vendure/core';

import { NfeSetting } from '../entities';
import { NfeSettingData, NfeSettingType } from '../types/generated-admin-types';

@Injectable()
export class NfeSettingService {
    private readonly relations = ['channels'];

    constructor(private connection: TransactionalConnection, private listQueryBuilder: ListQueryBuilder) {}

    findAll(ctx: RequestContext, options?: ListQueryOptions<NfeSetting>): Promise<PaginatedList<NfeSetting>> {
        return this.listQueryBuilder
            .build(NfeSetting, options as ListQueryOptions<NfeSetting>, { ctx })
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }

    findOne(ctx: RequestContext, id: ID): Promise<NfeSetting> {
        return this.connection.getRepository(ctx, NfeSetting).findOneOrFail({ where: { id }, relations: this.relations });
    }

    findOneByTypeAndMethodId(ctx: RequestContext, type: string, methodId: ID): Promise<NfeSetting | null> {
        return this.connection
            .getRepository(ctx, NfeSetting)
            .createQueryBuilder('nfeSetting')
            .where('nfeSetting.type = :type', { type })
            .andWhere('nfeSetting.methodId = :methodId', { methodId })
            .getOne();
    }

    create(ctx: RequestContext, type: NfeSettingType, input: DeepPartial<NfeSetting>): Promise<NfeSetting> {
        const nfeSetting = new NfeSetting({ type, data: input.data, methodId: input.methodId });

        return this.connection.getRepository(ctx, NfeSetting).save(nfeSetting);
    }

    async update(ctx: RequestContext, input: { id: ID; data: Record<string, any> }): Promise<NfeSetting> {
        const nfeSetting = await this.findOne(ctx, input.id);
        const updatedNfeSetting = patchEntity(nfeSetting, { data: input.data as NfeSettingData });

        return this.connection.getRepository(ctx, NfeSetting).save(updatedNfeSetting);
    }
}
