import { DeepPartial, Order, VendureEntity } from '@vendure/core';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { NfeState } from '../states';
import {
    NfeEnv,
    NfeExportation,
    NfeInfo,
    NfePayment,
    NfeRecipient,
    NfeReferences,
    NfeTransport,
} from '../types/generated-admin-types';
import { NfeCompany, NfeOperation, NfeProduct } from '.';

@Entity()
export class Nfe extends VendureEntity {
    constructor(input?: DeepPartial<Nfe>) {
        super(input);
    }

    @Column({ type: 'varchar', default: NfeEnv.Homologation }) env: NfeEnv;
    @Column({ type: 'varchar', default: 'Created' }) state: NfeState;

    // data of emited nfe
    @Column({ nullable: true }) series?: string;
    @Column({ nullable: true }) number?: string;
    @Column({ nullable: true }) receipt?: string;
    @Column({ nullable: true }) key?: string;
    @Column({ nullable: true }) xml?: string;
    @Column({ nullable: true }) danfe?: string;

    // data for nfe emission
    @Column('simple-json', { nullable: true }) info: NfeInfo;
    @Column('simple-json', { nullable: true }) recipient: NfeRecipient;
    @Column('simple-json', { nullable: true }) payment: NfePayment;
    @Column('simple-json', { nullable: true }) transport?: NfeTransport;
    @Column('simple-json', { nullable: true }) exportation?: NfeExportation;
    @Column('simple-json', { nullable: true }) references?: NfeReferences;

    // associations
    @ManyToOne(() => NfeCompany, nfeCompany => nfeCompany.nfes, { onDelete: 'RESTRICT' })
    @JoinColumn()
    company: NfeCompany;

    @OneToOne(() => Order, { onDelete: 'SET NULL' })
    @JoinColumn()
    order: Order;

    @OneToOne(() => NfeOperation, { nullable: true })
    @JoinColumn()
    lastOperation?: NfeOperation;

    @OneToMany(() => NfeOperation, nfeOperation => nfeOperation.nfe, { nullable: true })
    operations?: NfeOperation;

    @OneToMany(() => NfeProduct, product => product.nfe, { cascade: ['insert', 'update'] })
    products: NfeProduct[];
}
