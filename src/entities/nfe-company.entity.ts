import { Channel, DeepPartial, VendureEntity } from '@vendure/core';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import {
    NfeCompanyAddress,
    NfeCompanyCertificate,
    NfeCompanyEmitterCredentials,
    NfeCompanyTaxSettings,
} from '../types/generated-admin-types';
import { Nfe } from './nfe.entity';

export enum NfeCompanyUnit {
    HEAD_OFFICE = 'matriz',
    BRANCH_OFFICE = 'filial',
}

@Entity()
export class NfeCompany extends VendureEntity {
    constructor(input?: DeepPartial<NfeCompany>) {
        super(input);
    }

    // basic company data
    @Column() ownerName: string;
    @Column() corporateName: string;
    @Column() email: string;
    @Column() phone: string;
    @Column({ nullable: true }) tradeName?: string;
    @Column({ nullable: true }) accounting?: string;
    @Column({ nullable: true }) subdomain?: string;
    @Column({ nullable: true }) logoUrl?: string;
    @Column({ type: 'varchar' }) unit: NfeCompanyUnit;
    @Column({ type: 'simple-json', nullable: true }) address: NfeCompanyAddress;

    // brazilian documents
    @Column({ unique: true }) cnpj: string;
    @Column() cpf: string;
    @Column() ie: string;

    // nfe tax settings
    @Column({ type: 'simple-json', nullable: true }) taxSettings: NfeCompanyTaxSettings;

    // emitter settings
    @Column({ type: 'simple-json', nullable: true }) certificate: NfeCompanyCertificate;
    @Column({ type: 'simple-json', nullable: true }) emitterCredentials: NfeCompanyEmitterCredentials;

    // associations
    @ManyToMany(() => Channel)
    @JoinTable()
    channels: Channel[];

    @OneToMany(() => Nfe, nfe => nfe.company)
    nfes: Nfe[];

    @BeforeInsert()
    @BeforeUpdate()
    updateDocumentsToOnlyNumbers(): void {
        this.cnpj = this.onlyNumbers(this.cnpj);
        this.cpf = this.onlyNumbers(this.cpf);
        this.ie = this.onlyNumbers(this.ie);
    }

    private onlyNumbers(value: string): string {
        return value.replace(/[^0-9]/g, '');
    }
}
