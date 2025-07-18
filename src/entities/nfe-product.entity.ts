import { DeepPartial, OrderLine, VendureEntity } from '@vendure/core';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import {
    NfeProductAdditionalInfo,
    NfeProductInfo,
    NfeProductTaxes,
    NfeProductSpecificDetailing,
} from '../types/generated-admin-types';
import { Nfe } from './nfe.entity';

@Entity()
export class NfeProduct extends VendureEntity {
    constructor(input?: DeepPartial<NfeProduct>) {
        super(input);
    }

    // product basic data
    @Column('simple-json') info: NfeProductInfo;

    // product optional data
    @Column('simple-json', { nullable: true }) taxes?: NfeProductTaxes;
    @Column('simple-json', { nullable: true }) additionalInfo?: NfeProductAdditionalInfo;
    @Column('simple-json', { nullable: true }) specificDetailing?: NfeProductSpecificDetailing;

    // associations
    @ManyToOne(() => Nfe, nfe => nfe.products, { onDelete: 'CASCADE' })
    @JoinColumn()
    nfe: Nfe;

    @OneToOne(() => OrderLine, orderLine => orderLine.id, { onDelete: 'SET NULL' })
    @JoinColumn()
    orderLine: OrderLine;
}
