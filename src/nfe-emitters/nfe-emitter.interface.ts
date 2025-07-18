import { Nfe, NfeCompany, NfeOperation } from '../entities';

export interface NfeEmitter {
    statusSefaz(): Promise<'online' | 'offline'>;

    validateCertificate(): Promise<Date>;

    emitNFe(data: Nfe): Promise<EmitterOperationResponse>;

    emitNFeDevolution(data: NfeOperation): Promise<EmitterOperationResponse>;

    emitNfeAdjustment(data: NfeOperation): Promise<EmitterOperationResponse>;

    emitNfeAdditional(data: NfeOperation): Promise<EmitterOperationResponse>;

    emitCorrectionLetter(data: NfeOperation): Promise<EmitterOperationResponse>;

    consultNfe(data: NfeOperation): Promise<EmitterOperationResponse>;

    cancelNfe(data: NfeOperation): Promise<EmitterOperationResponse>;

    disableNumberSequence(data: DisableNumberSequenceData): Promise<DisableNumberSequenceResponse>;

    updateCompany(nfeCompany: NfeCompany): Promise<EmitterUpdateCompanyResponse>;
}

export type EmitterOperationResponse = {
    emisorId: string;
    status: string;
    numero: string;
    serie: string;
    recibo: string;
    chave: string;
    xml: string;
    danfe: string;
    sefaz: string;
};

export type DisableNumberSequenceData = {
    sequencia: string;
    motivo: string;
    ambiente: string;
    serie: string;
    modelo: string;
};

export type DisableNumberSequenceResponse = {
    xml: string;
    sefaz: string;
};

export type EmitterUpdateCompanyResponse = {
    success: boolean;
    message: string;
};
