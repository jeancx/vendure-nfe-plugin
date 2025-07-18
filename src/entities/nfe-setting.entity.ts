import { DeepPartial, ID, VendureEntity } from '@vendure/core';
import { Column, Entity, Unique } from 'typeorm';
import { NfeSettingData, NfeSettingType } from '../types/generated-admin-types';

@Entity()
@Unique(['type', 'methodId'])
export class NfeSetting extends VendureEntity {
    constructor(input?: DeepPartial<NfeSetting>) {
        super(input);
    }

    // setting key
    @Column({ type: 'varchar', update: false }) type: NfeSettingType;

    // setting method of payment or shipping to associate
    @Column({ type: 'varchar', update: false, nullable: true }) methodId?: ID;

    // setting data
    @Column('simple-json') data?: NfeSettingData;
}
