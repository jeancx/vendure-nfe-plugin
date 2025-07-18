import gql from 'graphql-tag';

export const NFE_LIST_ITEM_FRAGMENT = gql`
    fragment NfeListItem on Nfe {
        id
        createdAt
        updatedAt
        state
        env
        series
        number
        order {
            id
            code
        }
    }
`;

export const NFE_COMPANY_LIST_ITEM_FRAGMENT = gql`
    fragment NfeCompanyListItem on NfeCompany {
        id
        createdAt
        updatedAt
        corporateName
        unit
        address {
            city
        }
        channels {
            id
            code
        }
    }
`;

export const NFE_OPERATION_RESPONSE_FRAGMENT = gql`
    fragment NfeOperationResponse on NfeOperationResponse {
        emissorId
        status
        serie
        numero
        recibo
        chave
        xml
        danfe
        sefaz
    }
`;

export const NFE_OPERATION_FRAGMENT = gql`
    fragment NfeOperation on NfeOperation {
        env
        type
        info {
            classe_imposto
            operacao
            natureza_operacao
            volume
            informacoes_fisco
            informacoes_complementares
            correcao
            motivo
        }
        products {
            quantidade
            subtotal
            total
            codigo_cfop
            situacao_tributaria
            beneficio_fiscal
        }
        taxes {
            codigo_cfop
            beneficio_fiscal
            situacao_tributaria
            item_servico
            exigibilidade
            incentivo_fiscal
            bc_ipi
            bc_icms_st
            bc_issqn
            valor_ipi
            valor_icms
            valor_icms_st
            valor_issqn
            aliquota_mva
        }
        response {
            emissorId
            status
            serie
            numero
            recibo
            chave
            xml
            danfe
            sefaz
        }
    }
`;

export const CHANNEL_FRAGMENT = gql`
    fragment ChannelFragment on Channel {
        id
        code
        currencyCode
    }
`;

export const NFE_COMPANY_FRAGMENT = gql`
    fragment NfeCompany on NfeCompany {
        id
        createdAt
        updatedAt
        ownerName
        corporateName
        email
        phone
        tradeName
        accounting
        subdomain
        logoUrl
        cpf
        cnpj
        ie
        unit
        address {
            postcode
            street
            number
            complement
            neighborhood
            city
            state
        }
        taxSettings {
            ibpt
            informacoes_fisco
            orientacao_danfe
            nfe_serie
            nfe_numero
            nfe_numero_dev
            nfce_serie
            nfce_numero
            nfce_numero_dev
            nfce_id_csc
            nfce_codigo_csc
            nfce_id_csc_dev
            nfce_codigo_csc_dev
        }
        certificate {
            base64
            password
        }
        emitterCredentials {
            consumer_key
            consumer_secret
            access_token
            access_token_secret
        }
        channels {
            ...ChannelFragment
        }
    }
    ${CHANNEL_FRAGMENT}
`;

export const NFE_SETTING_FRAGMENT = gql`
    fragment NfeSetting on NfeSetting {
        id
        createdAt
        updatedAt
        type
        data
        methodId
    }
`;

export const NFE_PRODUCT_FRAGMENT = gql`
    fragment NfeProduct on NfeProduct {
        info {
            item
            nome
            codigo
            ncm
            unidade
            origem
            peso
            quantidade
            desconto
            subtotal
            total
            classe_imposto
            detalhamento_especifico
        }
        taxes {
            icms {
                codigo_cfop
                situacao_tributaria
                aliquota_importacao
                industria
                aliquota_credito
                aliquota_mva
                aliquota_reducao
                aliquota_reducao_st
                aliquota_efetiva_icms
                aliquota_efetiva_icms_st
                aliquota_diferimento
                aliquota_fcp_retido
                aliquota_st_retido
                bc_st_retido
                icms_efetivo
                valor_st_retido
                valor_icms_substituto
                valor_fcp_retido
                motivo_desoneracao
                pauta_fiscal
            }
            ipi {
                situacao_tributaria
                codigo_enquadramento
                aliquota
                percentual_devolvido
                ipi_devolvido
                codigo_selo
                qtd_selo
            }
            pis {
                situacao_tributaria
                aliquota
            }
            cofins {
                situacao_tributaria
                aliquota
            }
            retencao_tributos {
                valor_pis
                valor_cofins
                valor_csll
                bc_irrf
                valor_irrf
                bc_previdencia
                valor_previdencia
            }
            importacao {
                aliquota
                iof
            }
        }
        additionalInfo {
            unidade_tributavel
            informacoes_adicionais
            beneficio_fiscal
            ind_escala
            cnpj_fabricante
            gtin
            gtin_tributavel
            cest
            nve
            nrecopi
            ativo_permanente
            ex_ipi
            rastro {
                lote
                quantidade
                data_fabricacao
                data_validade
            }
        }
        specificDetailing {
            medicamento {
                codigo_anvisa
                pmc
            }
            combustiveis {
                codigo_anp
                descricao_anp
                uf_consumo
                percentual_glp
                percentual_gnn
                percentual_gni
                partida
                codif
                qtd_temperatura
                bc_cide
                valor_cide
                bico
                bomba
                tanque
                encerrante_inicio
                encerrante_final
            }
        }
        orderLine {
            id
            featuredAsset {
                preview
            }
            productVariant {
                id
                name
                sku
            }
            unitPrice
            unitPriceWithTax
            proratedUnitPrice
            proratedUnitPriceWithTax
            quantity
            items {
                id
                unitPrice
                unitPriceWithTax
                taxRate
                refundId
                cancelled
            }
            linePrice
            lineTax
            linePriceWithTax
            discountedLinePrice
            discountedLinePriceWithTax
        }
    }
`;

export const NFE_FRAGMENT = gql`
    fragment Nfe on Nfe {
        id
        createdAt
        updatedAt
        state
        env
        series
        number
        receipt
        key
        xml
        danfe
        info {
            operacao
            natureza_operacao
            modelo
            presenca
            intermediador
            frete
            desconto
            total
            data_emissao
            data_entrada_saida
            despesas_acessorias
            despesas_aduaneiras
            informacoes_fisco
            informacoes_complementares
            observacoes_contribuinte
        }
        recipient {
            tipo_pessoa
            nome_completo
            cpf
            cnpj
            razao_social
            ie
            suframa
            substituto_tributario
            consumidor_final
            contribuinte
            telefone
            email
            id_estrangeiro
            nome_estrangeiro
            codigo_pais
            nome_pais
            logradouro
            numero
            complemento
            bairro
            cidade
            uf
            cep
        }
        payment {
            fatura {
                numero
                valor
                desconto
                valor_liquido
            }
            parcelas {
                vencimento
                valor
            }
        }
        transport {
            modalidade
            volume
            especie
            peso_bruto
            peso_liquido
            total
            marca
            numeracao
            lacres
        }
        exportation {
            uf_embarque
            local_embarque
            local_despacho
        }
        references {
            nfes
            ctes
            ecfs {
                modelo
                n_ecf
                n_coo
            }
        }
        company {
            id
        }
        order {
            id
            code
        }
        lastOperation {
            ...NfeOperation
        }
        operations {
            ...NfeOperation
        }
        products {
            ...NfeProduct
        }
    }
    ${NFE_OPERATION_FRAGMENT}
    ${NFE_PRODUCT_FRAGMENT}
`;
