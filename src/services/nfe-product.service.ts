import { Injectable } from '@nestjs/common';
import { omit } from '@vendure/common/lib/omit';
import { ID, patchEntity, RequestContext, TransactionalConnection } from '@vendure/core';

import { Nfe, NfeProduct } from '../entities';
import { NfeProductInput } from '../types/generated-admin-types';

@Injectable()
export class NfeProductService {
    private readonly relations = ['orderLine'];

    constructor(private connection: TransactionalConnection) {}

    findOne(ctx: RequestContext, id: ID): Promise<NfeProduct> {
        return this.connection.getRepository(ctx, NfeProduct).findOneOrFail({ where: { id }, relations: this.relations });
    }

    async create(ctx: RequestContext, input: NfeProductInput, nfe: Nfe): Promise<NfeProduct> {
        const nfeProduct = new NfeProduct({ ...NfeProductService.mapInput(input), nfe: nfe });

        return await this.connection.getRepository(ctx, NfeProduct).save(nfeProduct);
    }

    async update(ctx: RequestContext, id: ID, input: NfeProductInput): Promise<NfeProduct> {
        const nfeProduct = await this.findOne(ctx, id);
        const updatedNfeProduct = patchEntity(nfeProduct, omit(NfeProductService.mapInput(input), ['orderLine']));

        return await this.connection.getRepository(ctx, NfeProduct).save(updatedNfeProduct);
    }

    private static mapInput(input: NfeProductInput): NfeProductInput {
        const nfeProduct: NfeProductInput = {
            info: input.info,
            additionalInfo: input.additionalInfo,
            orderLine: { id: String(input.orderLine.id) },
            taxes: undefined,
        };

        if (input.info.detalhamento_especifico === 'medicamento') {
            nfeProduct.specificDetailing = {
                medicamento: input.specificDetailing?.medicamento,
            };
        }

        if (input.info.detalhamento_especifico === 'combustiveis') {
            nfeProduct.specificDetailing = {
                combustiveis: input.specificDetailing?.combustiveis,
            };
        }

        if (input.info.classe_imposto === 'manual' && input.taxes) {
            nfeProduct.taxes = input.taxes;
        }

        return nfeProduct;
    }
}
