import { Nfe } from '../../entities';
import {
    Maybe,
    NfeExportation,
    NfeInfo,
    NfePayment,
    NfePaymentInstallment,
    NfePaymentInvoice,
    NfeRecipient,
    NfeTransport,
} from '../../types/generated-admin-types';
import { JsonData } from '../../types';
import { EmitterOperationResponse } from '../nfe-emitter.interface';

function convertMoney(value?: number | null | undefined): string {
    if (!value || value === 0) return '0.00';

    return (value / 100).toFixed(2);
}

function mapCustomer(recipient: NfeRecipient) {
    const customer: Record<any, any> = {};

    customer.endereco = recipient.logradouro;
    customer.numero = recipient.numero;
    customer.complemento = recipient.complemento;
    customer.bairro = recipient.bairro;
    customer.cidade = recipient.cidade;
    customer.uf = recipient.uf;
    customer.cep = recipient.cep;
    customer.telefone = recipient.telefone;
    customer.email = recipient.email;

    if (recipient.tipo_pessoa === 'F') {
        customer.contribuinte = 9;
        customer.cpf = recipient.cpf;
        customer.nome_completo = recipient.nome_completo;
        customer.consumidor_final = recipient.consumidor_final;
        customer.substituto_tributario = recipient.substituto_tributario;
        customer.ie = recipient.ie;
    }

    if (recipient.tipo_pessoa === 'J') {
        customer.contribuinte = recipient.contribuinte;
        customer.consumidor_final = recipient.consumidor_final;
        customer.cnpj = recipient.cnpj;
        customer.razao_social = recipient.razao_social;
        customer.ie = recipient.ie;
        customer.suframa = recipient.suframa;
    }

    if (recipient.tipo_pessoa === 'E') {
        customer.id_estrangeiro = recipient.id_estrangeiro;
        customer.nome_estrangeiro = recipient.nome_estrangeiro;
        customer.cod_pais = recipient.codigo_pais;
        customer.nome_pais = recipient.nome_pais;
    }

    return customer;
}

function mapProducts(products: Record<any, any>): JsonData[] {
    return products.map(product => ({
        ID: product.orderLine.id,
        item: product.info.item,
        nome: product.info.nome,
        codigo: product.info.codigo,
        ncm: product.info.ncm,
        quantidade: product.info.quantidade,
        unidade: product.info.unidade,
        peso: product.info.peso?.toFixed(2) || '0.00',
        origem: product.info.origem,
        desconto: convertMoney(product.info.desconto),
        subtotal: convertMoney(product.info.subtotal),
        total: convertMoney(product.info.total),
        classe_imposto: product.info.classe_imposto,
        informacoes_adicionais: product.additionalInfo?.informacoes_adicionais,
        beneficio_fiscal: product.additionalInfo?.beneficio_fiscal,
        ind_escala: product.additionalInfo?.ind_escala,
        cnpj_fabricante: product.additionalInfo?.cnpj_fabricante,
        gtin: product.additionalInfo?.gtin,
        cest: product.additionalInfo?.cest,
        nrecopi: product.additionalInfo?.nrecopi,
        ativo_permanente: product.additionalInfo?.ativo_permanente,
        ex_ipi: product.additionalInfo?.ex_ipi,
    }));
}

function mapOrder(info: NfeInfo, transport: NfeTransport | undefined, payment: NfePayment): JsonData {
    const pedido = {
        presenca: info.presenca,
        modalidade_frete: transport?.modalidade || 1,
        frete: convertMoney(info.frete),
        desconto: convertMoney(info.desconto),
        despesas_acessorias: convertMoney(info.despesas_acessorias),
        despesas_aduaneiras: convertMoney(info.despesas_aduaneiras),
        informacoes_fisco: info.informacoes_fisco,
        informacoes_complementares: info.informacoes_complementares,
    };

    const pagamento: Record<any, any> = {
        pagamento: 0,
        forma_pagamento: '03',
        tipo_integracao: 2,
        cnpj_credenciadora: '',
        bandeira: '01',
        autorizacao: '',
    };

    if (pagamento.forma_pagamento === '01') {
        pagamento.valor_pagamento =
            payment.parcelas?.map(payment => convertMoney(payment?.valor)) || convertMoney(info.total);
    }

    return { ...pedido, ...pagamento };
}

function mapTransport(transport: NfeTransport): JsonData {
    return {
        volume: transport.volume,
        especie: transport.especie,
        peso_bruto: transport.peso_bruto?.toFixed(4),
        peso_liquido: transport.peso_liquido?.toFixed(4),
    };
}

function mapInvoice(fatura: NfePaymentInvoice): JsonData {
    return {
        numero: fatura.numero,
        valor: convertMoney(fatura.valor),
        desconto: convertMoney(fatura.desconto),
        valor_liquido: convertMoney(fatura.valor_liquido),
    };
}

function mapInstallments(installments: Maybe<NfePaymentInstallment>[]): JsonData[] {
    return installments.map(installment => ({
        vencimento: installment?.vencimento,
        valor: convertMoney(installment?.valor),
    }));
}

function mapExport(exportation: NfeExportation | null | undefined): JsonData | undefined {
    if (!exportation) return undefined;

    return {
        uf_embarque: exportation.uf_embarque,
        local_embarque: exportation.local_embarque,
        local_despacho: exportation.local_despacho,
    };
}

export function mapEmitNFeData(nfe: Nfe): Record<any, any> {
    const nfeData: Record<any, any> = {
        ID: nfe.order?.id || '',
        operacao: nfe.info.operacao,
        natureza_operacao: nfe.info.natureza_operacao,
        modelo: nfe.info.modelo,
        finalidade: 1,
        ambiente: nfe.env === 'PRODUCTION' ? 1 : 2,
        cliente: mapCustomer(nfe.recipient),
        produtos: mapProducts(nfe.products),
        pedido: mapOrder(nfe.info, nfe.transport, nfe.payment),
        assincrono: false,
        calculo_impostos: false,
        data_emissao: nfe.info.data_emissao || '',
        data_entrada_saida: nfe.info.data_entrada_saida || '',
    };

    if (nfe.transport) nfeData.transporte = mapTransport(nfe.transport);
    if (nfe.payment.fatura) nfeData.fatura = mapInvoice(nfe.payment.fatura);
    if (nfe.payment.parcelas) nfeData.parcelas = mapInstallments(nfe.payment.parcelas);
    if (nfe.exportation) nfeData.exportacao = mapExport(nfe.exportation);

    return nfeData;
}

export function mapResponseToOperacao(response: Record<string, any>): EmitterOperationResponse {
    return {
        emisorId: response.uuid,
        status: response.status,
        numero: response.nfe,
        serie: response.serie,
        recibo: response.recibo,
        chave: response.chave,
        xml: response.xml,
        danfe: response.danfe,
        sefaz: typeof response.log === 'object' ? JSON.stringify(response.log, null, 4) : response.log,
    };
}
