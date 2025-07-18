import { Injectable } from '@nestjs/common';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import {
    ID,
    ListQueryBuilder,
    patchEntity,
    RequestContext,
    TransactionalConnection,
    DeepPartial,
    InputPatch,
    ListQueryOptions,
} from '@vendure/core';
import { NfeCompany, NfeCompanyUnit } from '../entities';
import {
    CreateNfeCompanyInput,
    NfeCompanyAddress,
    UpdateNfeCompanyInput,
} from '../types/generated-admin-types';

@Injectable()
export class NfeCompanyService {
    private readonly relations = ['channels'];

    constructor(private connection: TransactionalConnection, private listQueryBuilder: ListQueryBuilder) {}

    findAll(ctx: RequestContext, options: ListQueryOptions<NfeCompany>): Promise<PaginatedList<NfeCompany>> {
        return this.listQueryBuilder
            .build(NfeCompany, options as ListQueryOptions<NfeCompany>, { ctx })
            .getManyAndCount()
            .then(([items, totalItems]) => ({ items, totalItems }));
    }

    findOne(ctx: RequestContext, id: ID): Promise<NfeCompany> {
        return this.connection.getRepository(ctx, NfeCompany).findOneOrFail({ where: { id }, relations: this.relations });
    }

    findOneByChannelId(ctx: RequestContext, id: ID): Promise<NfeCompany | null> {
        return this.connection
            .getRepository(ctx, NfeCompany)
            .createQueryBuilder('nfeCompany')
            .leftJoin('nfeCompany.channels', 'channels')
            .where('channels.id = :channelId', { channelId: id })
            .getOne();
    }

    async create(ctx: RequestContext, input: CreateNfeCompanyInput): Promise<NfeCompany> {
        const nfeCompany = new NfeCompany(NfeCompanyService.mapInput(input) as DeepPartial<NfeCompany>);
        const repository = this.connection.getRepository(ctx, NfeCompany);

        await repository.save(nfeCompany);
        nfeCompany.channels = [ctx.channel];

        return await repository.save(nfeCompany);
    }

    async update(ctx: RequestContext, input: UpdateNfeCompanyInput): Promise<NfeCompany> {
        const nfeCompany = await this.findOne(ctx, input.id);
        const updatedNfeCompany = patchEntity(nfeCompany, NfeCompanyService.mapInput(input) as InputPatch<NfeCompany>);

        return this.connection.getRepository(ctx, NfeCompany).save(updatedNfeCompany);
    }

    private static mapInput(
        input: CreateNfeCompanyInput | UpdateNfeCompanyInput,
    ): DeepPartial<NfeCompany> | InputPatch<NfeCompany> {
        return {
            ...input,
            unit: input.unit.toString() as NfeCompanyUnit,
            address: input.address as NfeCompanyAddress,
            taxSettings: input.taxSettings || {},
            certificate: input.certificate || {},
            emitterCredentials: input.emitterCredentials || {},
        };
    }
}
