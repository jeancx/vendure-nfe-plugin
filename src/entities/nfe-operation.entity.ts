import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Nfe } from './nfe.entity';
import {
    NfeOperationInfo,
    NfeOperationProduct,
    NfeOperationResponse,
    NfeOperationTaxes,
    NfeEnv,
    NfeOperationType,
} from '../types/generated-admin-types';

@Entity()
export class NfeOperation extends VendureEntity {
    constructor(input?: DeepPartial<NfeOperation>) {
        super(input);
    }

    // operation
    @Column({ type: 'varchar', default: NfeEnv.Homologation }) env: NfeEnv;
    @Column({ type: 'varchar', default: NfeOperationType.Emission }) type: NfeOperationType;

    // operation data
    @Column({ type: 'simple-json' }) info: NfeOperationInfo;
    @Column({ type: 'simple-json', nullable: true }) products?: NfeOperationProduct[];
    @Column({ type: 'simple-json', nullable: true }) taxes?: NfeOperationTaxes;

    // operation emitter response
    @Column({ type: 'simple-json', nullable: true }) response?: NfeOperationResponse;

    // associations
    @ManyToOne(() => Nfe)
    @JoinColumn()
    nfe?: Nfe;

    @OneToOne(() => NfeOperation)
    @JoinColumn()
    previousOperation?: NfeOperation;
}
