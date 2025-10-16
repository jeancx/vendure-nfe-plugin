import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';

import { DateHelper } from '../../common';
import {
    CreateNfeInput,
    GetNfeOrder,
    NfeFragment,
    NfeOrderDiscountFragment,
    NfeOrderLineFragment,
    NfeProductInput,
    UpdateNfeInput,
} from '../../generated-types';
import { GET_NFE_ORDER } from './nfe-order.graphql';

export class NfeFormHelper {
    private static fb = new FormBuilder();

    static buildNfeFormGroup(): FormGroup {
        return this.fb.group({
            info: this.fb.group({
                operacao: [''],
                natureza_operacao: ['', Validators.required],
                modelo: [''],
                presenca: ['', Validators.required],
                intermediador: ['', Validators.required],
                frete: [''],
                desconto: [''],
                total: ['', Validators.required],
                data_emissao: [''],
                data_entrada_saida: [''],
                despesas_acessorias: [''],
                despesas_aduaneiras: [''],
                informacoes_fisco: [''],
                informacoes_complementares: [''],
                observacoes_contribuinte: [''],
            }),
            recipient: this.fb.group({
                tipo_pessoa: ['', Validators.required],
                nome_completo: [''],
                cpf: [''],
                cnpj: [''],
                razao_social: [''],
                ie: [''],
                suframa: [''],
                substituto_tributario: [''],
                consumidor_final: [''],
                contribuinte: [''],
                telefone: ['', Validators.required],
                email: ['', Validators.required],
                id_estrangeiro: [''],
                nome_estrangeiro: [''],
                codigo_pais: [''],
                nome_pais: [''],
                logradouro: ['', Validators.required],
                numero: ['', Validators.required],
                complemento: ['', Validators.required],
                bairro: ['', Validators.required],
                cidade: ['', Validators.required],
                uf: ['', Validators.required],
                cep: ['', Validators.required],
            }),
            payment: this.fb.group({
                fatura: this.fb.group({
                    numero: [''],
                    valor: [''],
                    desconto: [''],
                    valor_liquido: [''],
                }),
                parcelas: this.fb.array([this.buildInstallmentItem()]),
            }),
            transport: this.fb.group({
                modalidade: [''],
                volume: [''],
                especie: [''],
                peso_bruto: [''],
                peso_liquido: [''],
                marca: [''],
                numeracao: [''],
                lacres: [''],
            }),
            exportation: this.fb.group({
                uf_embarque: [''],
                local_embarque: [''],
                local_despacho: [''],
            }),
            references: this.fb.group({
                nfes: this.fb.array([this.fb.control('')]),
                ctes: this.fb.array([this.fb.control('')]),
                ecfs: this.fb.array([
                    this.fb.group({
                        modelo: [''],
                        n_ecf: [''],
                        n_coo: [''],
                    }),
                ]),
            }),
            products: this.fb.array([this.buildProductItem()]),
            order: this.fb.group({
                id: [''],
                code: [''],
            }),
        });
    }

    static buildProductItem(): FormGroup {
        return this.fb.group({
            info: this.fb.group({
                item: [''],
                nome: ['', Validators.required],
                codigo: ['', Validators.required],
                ncm: [''],
                quantidade: ['', Validators.required],
                unidade: [''],
                peso: [''],
                origem: [''],
                desconto: [''],
                subtotal: ['', Validators.required],
                total: ['', Validators.required],
                classe_imposto: [''],
                detalhamento_especifico: [''],
            }),
            taxes: this.fb.group({
                icms: this.fb.group({
                    codigo_cfop: [''],
                    situacao_tributaria: [''],
                    aliquota_importacao: [''],
                    industria: [''],
                    aliquota_credito: [''],
                    aliquota_mva: [''],
                    aliquota_reducao: [''],
                    aliquota_reducao_st: [''],
                    aliquota_efetiva_icms: [''],
                    aliquota_efetiva_icms_st: [''],
                    aliquota_diferimento: [''],
                    aliquota_fcp_retido: [''],
                    aliquota_st_retido: [''],
                    bc_st_retido: [''],
                    icms_efetivo: [''],
                    valor_st_retido: [''],
                    valor_icms_substituto: [''],
                    valor_fcp_retido: [''],
                    motivo_desoneracao: [''],
                    pauta_fiscal: [''],
                }),
                ipi: this.fb.group({
                    situacao_tributaria: [''],
                    codigo_enquadramento: [''],
                    aliquota: [''],
                    percentual_devolvido: [''],
                    ipi_devolvido: [''],
                    codigo_selo: [''],
                    qtd_selo: [''],
                }),
                pis: this.fb.group({
                    situacao_tributaria: [''],
                    aliquota: [''],
                }),
                cofins: this.fb.group({
                    situacao_tributaria: [''],
                    aliquota: [''],
                }),
                retencao_tributos: this.fb.group({
                    valor_pis: [''],
                    valor_cofins: [''],
                    valor_csll: [''],
                    bc_irrf: [''],
                    valor_irrf: [''],
                    bc_previdencia: [''],
                    valor_previdencia: [''],
                }),
                importacao: this.fb.group({
                    aliquota: [''],
                    iof: [''],
                }),
            }),
            additionalInfo: this.fb.group({
                unidade_tributavel: [''],
                informacoes_adicionais: [''],
                beneficio_fiscal: [''],
                ind_escala: [''],
                cnpj_fabricante: [''],
                gtin: [''],
                gtin_tributavel: [''],
                cest: [''],
                nve: [''],
                nrecopi: [''],
                ativo_permanente: [''],
                ex_ipi: [''],
                rastro: this.fb.group({
                    lote: [''],
                    quantidade: [''],
                    data_fabricacao: [''],
                    data_validade: [''],
                }),
            }),
            specificDetailing: this.fb.group({
                medicamento: this.fb.group({
                    codigo_anvisa: [''],
                    pmc: [''],
                }),
                combustiveis: this.fb.group({
                    codigo_anp: [''],
                    descricao_anp: [''],
                    uf_consumo: [''],
                    percentual_glp: [''],
                    percentual_gnn: [''],
                    percentual_gni: [''],
                    partida: [''],
                    codif: [''],
                    qtd_temperatura: [''],
                    bc_cide: [''],
                    valor_cide: [''],
                    bico: [''],
                    bomba: [''],
                    tanque: [''],
                    encerrante_inicio: [''],
                    encerrante_final: [''],
                }),
            }),
            orderLine: this.fb.group({
                id: [''],
            }),
        });
    }

    static buildInstallmentItem(): FormGroup {
        return this.fb.group({
            vencimento: [''],
            valor: [''],
        });
    }

    static getOrderMappedtoNfeStream(dataService: DataService, id: string): Observable<CreateNfeInput> {
        return dataService.query<GetNfeOrder.Query, GetNfeOrder.Variables>(GET_NFE_ORDER, { id }).mapStream(data => {
            const order = data.order;
            const address = order?.billingAddress?.streetLine1 ? order?.billingAddress : order?.shippingAddress;
            const currentDateTime = DateHelper.format(new Date(), 'yyyy-MM-ddTHH:mm');
            const discountSum = this.sumAdjustment(order?.discounts || []);
            const totalWithTax = order?.totalWithTax || 0;

            console.log(order);

            return {
                __typename: 'Nfe',
                id: '',
                info: {
                    __typename: 'NfeInfo',
                    operacao: 1,
                    natureza_operacao:
                        'Venda de mercadoria adquirida ou recebida de terceiros, destinada a não contribuinte',
                    modelo: 1,
                    presenca: 2,
                    intermediador: 1,
                    frete: order?.shippingWithTax,
                    desconto: 0,
                    total: totalWithTax,
                    data_emissao: currentDateTime,
                    data_entrada_saida: currentDateTime,
                    despesas_acessorias: 0,
                    despesas_aduaneiras: 0,
                    informacoes_fisco: '',
                    informacoes_complementares: '',
                    observacoes_contribuinte: '',
                },
                recipient: {
                    __typename: 'NfeRecipient',
                    tipo_pessoa: 'F',
                    nome_completo: `${order?.customer?.firstName} ${order?.customer?.lastName}`,
                    cpf: order?.customer?.customFields?.cpf || '',
                    cnpj: order?.customer?.customFields?.cnpj || '',
                    razao_social: order?.customer?.customFields?.corporateName || '',
                    ie: order?.customer?.customFields?.ie || '',
                    suframa: order?.customer?.customFields?.suframa || '',
                    substituto_tributario: '',
                    consumidor_final: 1,
                    contribuinte: '9',
                    telefone: order?.customer?.phoneNumber || '',
                    email: order?.customer?.emailAddress,
                    id_estrangeiro: '',
                    nome_estrangeiro: '',
                    codigo_pais: address?.country || '',
                    nome_pais: address?.countryCode || '',
                    logradouro: address?.streetLine1 || '',
                    numero: '15',
                    complemento: address?.streetLine2 || '',
                    bairro: '',
                    cidade: address?.city || '',
                    uf: address?.province || '',
                    cep: address?.postalCode || '',
                },
                transport: {
                    __typename: 'NfeTransport',
                    modalidade: 1,
                    total: order?.shippingWithTax,
                    volume: '1',
                    especie: 'CAIXA',
                    peso_bruto: 1,
                    peso_liquido: 1,
                    marca: '',
                    numeracao: '',
                    lacres: '',
                },
                payment: {
                    __typename: 'NfePayment',
                    fatura: {
                        __typename: 'NfePaymentInvoice',
                        numero: order?.id,
                        valor: totalWithTax,
                        desconto: discountSum,
                        valor_liquido: totalWithTax - discountSum,
                    },
                    parcelas:
                        order?.payments?.map(payment => ({
                            __typename: 'NfePaymentInstallment',
                            vencimento: DateHelper.format(payment.createdAt, 'yyyy-MM-dd'),
                            valor: payment.amount,
                        })) || [],
                },
                exportation: {
                    __typename: 'NfeExportation',
                    uf_embarque: '',
                    local_embarque: '',
                    local_despacho: '',
                },
                references: {
                    __typename: 'NfeReferences',
                    nfes: [],
                    ctes: [],
                    ecfs: [],
                },
                products:
                    order?.lines.map((line: NfeOrderLineFragment) => ({
                        info: {
                            item: 0,
                            nome: line.productVariant.name,
                            codigo: line.productVariant.sku,
                            ncm: line.productVariant.product.customFields?.ncm || '',
                            quantidade: line.quantity,
                            unidade: line.productVariant.product.customFields?.unit || 'UN',
                            peso: 0,
                            origem: line.productVariant.product.customFields?.origin || 0,
                            desconto: this.sumAdjustment(line.discounts),
                            subtotal: line.unitPriceWithTax,
                            total: line.linePriceWithTax,
                            classe_imposto: 'REF11779924',
                            detalhamento_especifico: 'nenhum',
                        },
                        orderLine: {
                            id: line.id,
                        },
                    })) || [],
                order: {
                    __typename: 'Order',
                    id: order?.id,
                    code: order?.code,
                },
                company: {
                    __typename: 'NfeCompany',
                    id: '',
                },
            } as CreateNfeInput;
        });
    }

    static fillFormWithNfe(formGroup: FormGroup, nfe: NfeFragment): void {
        const productsFormArray = formGroup.get('products') as FormArray;
        const nfeProductsLength = nfe?.products?.length;
        if (Array.isArray(productsFormArray?.controls) && nfeProductsLength) {
            while (productsFormArray.controls.length < nfeProductsLength) {
                productsFormArray.push(this.buildProductItem());
            }
        }

        const installmentsFormArray = formGroup.get('payment')?.get('parcelas') as FormArray;
        const nfeInstallmentsLength = nfe?.payment?.parcelas?.length;
        if (Array.isArray(installmentsFormArray?.controls) && nfeInstallmentsLength) {
            while (installmentsFormArray.controls.length < nfeInstallmentsLength) {
                installmentsFormArray.push(this.buildInstallmentItem());
            }
        }

        formGroup.patchValue({
            ...nfe,
            info: {
                ...nfe.info,
                modelo: nfe.info.modelo,
                natureza_operacao: nfe.info.natureza_operacao,
                frete: nfe.info.frete,
                desconto: nfe.info.desconto,
                total: nfe.info.total,
                data_emissao: nfe.info.data_emissao,
                data_entrada_saida: nfe.info.data_entrada_saida,
                despesas_acessorias: nfe.info.despesas_acessorias,
                despesas_aduaneiras: nfe.info.despesas_aduaneiras,
            },
            payment: {
                fatura: {
                    ...nfe.payment.fatura,
                    valor: nfe.payment.fatura?.valor || 0,
                    desconto: nfe.payment.fatura?.desconto || 0,
                    valor_liquido: nfe.payment.fatura?.valor_liquido || 0,
                },
                parcelas:
                    nfe.payment.parcelas?.map(parcela => ({
                        vencimento: parcela?.vencimento,
                        valor: parcela?.valor,
                    })) || [],
            },
            transport: {
                ...nfe.transport,
                peso_bruto: nfe.transport?.peso_bruto,
                peso_liquido: nfe.transport?.peso_liquido,
                total: nfe.transport?.total,
            },
            products:
                nfe.products?.map(product => ({
                    ...product,
                    info: {
                        ...product.info,
                        peso: product.info.peso,
                        desconto: product.info.desconto,
                        subtotal: product.info.subtotal,
                        total: product.info.total,
                    },
                })) || [],
        });
    }

    static removeKeysWithEmptyValue(data: Record<string, any>): Record<string, any> {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (typeof data[key] == 'object') {
                    data[key] = this.removeKeysWithEmptyValue(data[key]);
                } else if (data[key] === '') {
                    delete data[key];
                }
            }
        }

        return data;
    }

    static prepareFormValuesToCreate(formGroup: FormGroup): CreateNfeInput {
        const formValue = formGroup.value;

        return this.removeKeysWithEmptyValue({
            info: {
                ...formValue.info,
                data_emissao: null,
                data_entrada_saida: null,
            },
            payment: formValue.payment,
            transport: formValue.transport,
            recipient: formValue.recipient,
            products: formValue.products.map((product: NfeProductInput) => {
                const nfeProduct: NfeProductInput = {
                    info: product.info,
                    additionalInfo: product.additionalInfo,
                    orderLine: product.orderLine,
                };

                if (product.info.detalhamento_especifico === 'medicamento') {
                    nfeProduct.specificDetailing = {
                        medicamento: product.specificDetailing?.medicamento,
                    };
                }

                if (product.info.detalhamento_especifico === 'combustiveis') {
                    nfeProduct.specificDetailing = {
                        combustiveis: product.specificDetailing?.combustiveis,
                    };
                }

                if (product.info.classe_imposto === 'manual') {
                    nfeProduct.taxes = product.taxes;
                }

                return nfeProduct;
            }),
            order: {
                id: formValue.order.id,
            },
        }) as CreateNfeInput;
    }

    static prepareFormValuesToUpdate(formGroup: FormGroup, id: string): UpdateNfeInput {
        const { info, recipient, payment, state } = formGroup.value;

        console.log({ info, recipient, payment, state });

        return this.removeKeysWithEmptyValue({
            id,
            info: {
                ...info,
                intermediador: parseInt(info.intermediador),
            },
            recipient,
            payment,
            state,
        }) as UpdateNfeInput;
    }

    private static sumAdjustment(adjustments: NfeOrderDiscountFragment[]): number {
        return Number(adjustments.reduce((acc, { amount }) => acc + amount, 0));
    }
}
