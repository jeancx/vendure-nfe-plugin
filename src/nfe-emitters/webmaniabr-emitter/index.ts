import axios, { Method } from 'axios';
import { Nfe, NfeCompany, NfeOperation } from '../../entities';
import {
    DisableNumberSequenceData,
    DisableNumberSequenceResponse,
    EmitterOperationResponse,
    EmitterUpdateCompanyResponse,
    NfeEmitter,
} from '../nfe-emitter.interface';
import { mapEmitNFeData, mapResponseToOperacao } from './mapping';
import { JsonData } from '../../types';

export default class WebmaniaBR implements NfeEmitter {
    private headers: Record<string, any>;

    constructor(nfeCompany: NfeCompany) {
        if (!nfeCompany.emitterCredentials?.consumer_key ||
            !nfeCompany.emitterCredentials?.consumer_secret ||
            !nfeCompany.emitterCredentials?.access_token ||
            !nfeCompany.emitterCredentials?.access_token_secret) {
            throw new Error('Webmaniabr API credentials are required. Please configure consumer_key, consumer_secret, access_token, and access_token_secret in the NFE company settings.');
        }

        this.headers = {
            'Content-Type': 'application/json',
            'X-Consumer-Key': nfeCompany.emitterCredentials.consumer_key,
            'X-Consumer-Secret': nfeCompany.emitterCredentials.consumer_secret,
            'X-Access-Token': nfeCompany.emitterCredentials.access_token,
            'X-Access-Token-Secret': nfeCompany.emitterCredentials.access_token_secret,
        };
    }

    public async request<T = any>(
        url: string,
        method: Method = 'get',
        data: JsonData = {},
        params: JsonData = {},
    ): Promise<T> {
        const baseURL = 'https://webmaniabr.com/api/1/nfe/';

        console.debug(JSON.stringify({ params, data }));

        return axios
            .request({ baseURL, method, url, headers: this.headers, params, data })
            .then(response => response.data)
            .catch(console.debug)
            .finally(console.debug);
    }

    public statusSefaz(): Promise<'online' | 'offline'> {
        return this.request('/sefaz', 'get').then(value => value.status);
    }

    public validateCertificate(): Promise<Date> {
        return this.request('/certificado', 'get').then(response => {
            const date = new Date();
            date.setDate(date.getDate() + Number(response.expiration));
            return date;
        });
    }

    public emitNFe(nfe: Nfe): Promise<EmitterOperationResponse> {
        return this.request('/emissao', 'post', mapEmitNFeData(nfe)).then(mapResponseToOperacao);
    }

    public emitNFeDevolution(_lastOperation: NfeOperation): Promise<EmitterOperationResponse> {
        return this.request('/devolucao', 'post').then(mapResponseToOperacao);
    }

    public emitNfeAdjustment(_lastOperation: NfeOperation): Promise<EmitterOperationResponse> {
        return this.request('/ajuste', 'post').then(mapResponseToOperacao);
    }

    public emitNfeAdditional(_lastOperation: NfeOperation): Promise<EmitterOperationResponse> {
        return this.request('/complementar', 'post').then(mapResponseToOperacao);
    }

    public emitCorrectionLetter(_lastOperation: NfeOperation): Promise<EmitterOperationResponse> {
        return this.request('/cartacorrecao', 'post').then(mapResponseToOperacao);
    }

    public consultNfe(_lastOperation: NfeOperation): Promise<EmitterOperationResponse> {
        return this.request('/cartacorrecao', 'post').then(mapResponseToOperacao);
    }

    public cancelNfe(_lastOperation: NfeOperation): Promise<EmitterOperationResponse> {
        return this.request('/cartacorrecao', 'post').then(mapResponseToOperacao);
    }

    public disableNumberSequence(_data: DisableNumberSequenceData): Promise<DisableNumberSequenceResponse> {
        return this.request('/cartacorrecao', 'post').then(mapResponseToOperacao);
    }

    public updateCompany(_nfeCompany: NfeCompany): Promise<EmitterUpdateCompanyResponse> {
        return this.request('/cartacorrecao', 'post').then(({ success, message }) => ({ success, message }));
    }
} 