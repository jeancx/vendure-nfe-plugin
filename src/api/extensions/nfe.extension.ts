import gql from 'graphql-tag';

const NFE_COMPANY = gql`
    type NfeCompany implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        ownerName: String!
        corporateName: String!
        email: String!
        phone: String!
        tradeName: String
        accounting: String
        subdomain: String
        logoUrl: String
        unit: NfeCompanyUnit!
        cpf: String!
        cnpj: String!
        ie: String!
        address: NfeCompanyAddress!
        taxSettings: NfeCompanyTaxSettings
        certificate: NfeCompanyCertificate
        emitterCredentials: NfeCompanyEmitterCredentials
        channels: [Channel]
        nfes: [Nfe]
    }

    enum NfeCompanyUnit {
        matriz
        filial
    }

    type NfeCompanyAddress {
        postcode: String!
        street: String!
        number: String!
        complement: String
        neighborhood: String!
        city: String!
        state: String!
    }

    type NfeCompanyTaxSettings {
        ibpt: String
        informacoes_fisco: String
        orientacao_danfe: String
        nfe_serie: Int
        nfe_numero: Int
        nfe_numero_dev: Int
        nfce_serie: Int
        nfce_numero: Int
        nfce_numero_dev: String
        nfce_id_csc: String
        nfce_codigo_csc: String
        nfce_id_csc_dev: String
        nfce_codigo_csc_dev: String
    }

    type NfeCompanyCertificate {
        base64: String
        password: String
    }

    type NfeCompanyEmitterCredentials {
        consumer_key: String
        consumer_secret: String
        access_token: String
        access_token_secret: String
    }

    type NfeCompanyList implements PaginatedList {
        items: [NfeCompany!]!
        totalItems: Int!
    }
`;

const NFE_SETTING = gql`
    type NfeSetting implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        type: NfeSettingType!
        data: JSON!
        methodId: ID
    }

    enum NfeSettingType {
        PaymentMethod
        ShippingMethod
        Custom
    }

    type NfeSettingPaymentMethod {
        pagamento: Int!
        forma_pagamento: String
        tipo_integracao: Int!
        cnpj_credenciadora: String
    }

    type NfeSettingShippingMethod {
        cnpj: String
        razao_social: String
        ie: String
        cpf: String
        nome_completo: String
        endereco: String
        uf: String
        cidade: String
        cep: String
        placa: String
        uf_veiculo: String
        rntc: String
        reboque: NfeSettingShippingMethodReboque
    }

    type NfeSettingShippingMethodReboque {
        placa: String
        uf_veiculo: String
        rntc: String
        vagao: String
        balsa: String
    }

    type NfeSettingCustomItem {
        key: String!
        value: String!
    }

    type NfeSettingCustom {
        set: [NfeSettingCustomItem!]!
    }

    union NfeSettingData = NfeSettingPaymentMethod | NfeSettingShippingMethod | NfeSettingCustom

    type NfeSettingList implements PaginatedList {
        items: [NfeSetting!]!
        totalItems: Int!
    }
`;

const NFE_OPERATION = gql`
    type NfeOperation {
        env: NfeEnv!
        type: NfeOperationType!
        info: NfeOperationInfo!
        products: [NfeOperationProduct]
        taxes: NfeOperationTaxes
        response: NfeOperationResponse
        nfe: Nfe!
        previousOperation: NfeOperation
    }

    enum NfeOperationType {
        EMISSION
        DEVOLUTION
        ADJUSTMENT
        COMPLEMENTARY
        CORRECTION
        CANCEL
    }

    type NfeOperationInfo {
        classe_imposto: String
        operacao: Int
        natureza_operacao: String
        volume: Float
        informacoes_fisco: String
        informacoes_complementares: String
        correcao: String
        motivo: String
    }

    type NfeOperationProduct {
        quantidade: Float
        subtotal: Float
        total: Float
        codigo_cfop: String
        situacao_tributaria: String
        beneficio_fiscal: String
    }

    type NfeOperationTaxes {
        codigo_cfop: String
        beneficio_fiscal: String
        situacao_tributaria: String
        item_servico: Int
        exigibilidade: Int
        incentivo_fiscal: Int
        bc_ipi: Float
        bc_icms_st: Float
        bc_issqn: Float
        valor_ipi: Float
        valor_icms: Float
        valor_icms_st: Float
        valor_issqn: Float
        aliquota_mva: Float
    }

    type NfeOperationResponse {
        emissorId: String
        status: String
        serie: String
        numero: String
        recibo: String
        chave: String
        xml: String
        danfe: String
        sefaz: String
    }
`;

const NFE_PRODUCT = gql`
    type NfeProduct {
        info: NfeProductInfo!
        taxes: NfeProductTaxes
        additionalInfo: NfeProductAdditionalInfo
        specificDetailing: NfeProductSpecificDetailing
        nfe: Nfe!
        orderLine: OrderLine!
    }

    type NfeProductInfo {
        item: Int
        nome: String!
        codigo: String!
        ncm: String!
        quantidade: Float!
        unidade: String!
        peso: Float!
        origem: Int!
        desconto: Float!
        subtotal: Float!
        total: Float!
        classe_imposto: String
        detalhamento_especifico: String
    }

    type NfeProductTaxesIcms {
        codigo_cfop: String
        situacao_tributaria: String
        aliquota_importacao: Float
        industria: Int
        aliquota_credito: Float
        aliquota_mva: Float
        aliquota_reducao: Float
        aliquota_reducao_st: Float
        aliquota_efetiva_icms: Float
        aliquota_efetiva_icms_st: Float
        aliquota_diferimento: Float
        aliquota_fcp_retido: Float
        aliquota_st_retido: Float
        bc_st_retido: Float
        icms_efetivo: Float
        valor_st_retido: Float
        valor_icms_substituto: Float
        valor_fcp_retido: Float
        motivo_desoneracao: Int
        pauta_fiscal: Float
    }

    type NfeProductTaxesIpi {
        situacao_tributaria: String
        codigo_enquadramento: String
        aliquota: Float
        percentual_devolvido: Float
        ipi_devolvido: Float
        codigo_selo: String
        qtd_selo: Int
    }

    type NfeProductTaxesPis {
        situacao_tributaria: String
        aliquota: Float
    }

    type NfeProductTaxesCofins {
        situacao_tributaria: String
        aliquota: Float
    }

    type NfeProductTaxesWithholding {
        valor_pis: Float
        valor_cofins: Float
        valor_csll: Float
        bc_irrf: Float
        valor_irrf: Float
        bc_previdencia: Float
        valor_previdencia: Float
    }

    type NfeProductTaxesImportation {
        aliquota: Float
        iof: Float
    }

    type NfeProductTaxes {
        icms: NfeProductTaxesIcms
        ipi: NfeProductTaxesIpi
        pis: NfeProductTaxesPis
        cofins: NfeProductTaxesCofins
        retencao_tributos: NfeProductTaxesWithholding
        importacao: NfeProductTaxesImportation
    }

    type NfeProductAdditionalInfoTrace {
        lote: String
        quantidade: Int
        data_fabricacao: Date
        data_validade: Date
    }

    type NfeProductAdditionalInfo {
        unidade_tributavel: String
        informacoes_adicionais: String
        beneficio_fiscal: String
        ind_escala: String
        cnpj_fabricante: String
        gtin: String
        gtin_tributavel: String
        cest: String
        nve: String
        nrecopi: String
        ativo_permanente: Boolean
        ex_ipi: String
        rastro: NfeProductAdditionalInfoTrace
    }

    type NfeProductAdditionalInfoMedicament {
        codigo_anvisa: String
        pmc: Float
    }

    type NfeProductAdditionalInfoFuel {
        codigo_anp: Int
        descricao_anp: Int
        uf_consumo: String
        percentual_glp: Float
        percentual_gnn: Float
        percentual_gni: Float
        partida: Float
        codif: Int
        qtd_temperatura: Float
        bc_cide: Float
        valor_cide: Float
        bico: Float
        bomba: Float
        tanque: Float
        encerrante_inicio: Float
        encerrante_final: Float
    }

    type NfeProductSpecificDetailing {
        medicamento: NfeProductAdditionalInfoMedicament
        combustiveis: NfeProductAdditionalInfoFuel
    }
`;

const NFE = gql`
    type Nfe implements Node {
        id: ID!
        createdAt: DateTime
        updatedAt: DateTime
        state: String
        env: NfeEnv!
        series: String
        number: String
        receipt: String
        key: String
        xml: String
        danfe: String
        info: NfeInfo!
        recipient: NfeRecipient!
        payment: NfePayment!
        transport: NfeTransport
        exportation: NfeExportation
        references: NfeReferences
        company: NfeCompany!
        order: Order!
        lastOperation: NfeOperation
        operations: [NfeOperation]
        products: [NfeProduct!]
    }

    enum NfeEnv {
        PRODUCTION
        HOMOLOGATION
    }

    type NfeInfo {
        operacao: Int!
        natureza_operacao: String!
        modelo: Int!
        presenca: Int!
        intermediador: Int!
        frete: Float!
        desconto: Float!
        total: Float!
        data_emissao: DateTime
        data_entrada_saida: DateTime
        despesas_acessorias: Float
        despesas_aduaneiras: Float
        informacoes_fisco: String
        informacoes_complementares: String
        observacoes_contribuinte: String
    }

    type NfeRecipient {
        tipo_pessoa: String
        nome_completo: String
        cpf: String
        cnpj: String
        razao_social: String
        ie: String
        suframa: String
        substituto_tributario: String
        consumidor_final: Int
        contribuinte: String
        telefone: String
        email: String
        id_estrangeiro: String
        nome_estrangeiro: String
        codigo_pais: String
        nome_pais: String
        logradouro: String
        numero: String
        complemento: String
        bairro: String
        cidade: String
        uf: String
        cep: String
    }

    type NfePaymentInvoice {
        numero: String
        valor: Float
        desconto: Float
        valor_liquido: Float
    }

    type NfePaymentInstallment {
        vencimento: Date
        valor: Float
    }

    type NfePayment {
        fatura: NfePaymentInvoice
        parcelas: [NfePaymentInstallment]
    }

    type NfeTransport {
        modalidade: Int!
        volume: String
        especie: String
        peso_bruto: Float
        peso_liquido: Float
        total: Float
        marca: String
        numeracao: String
        lacres: String
    }

    type NfeExportation {
        uf_embarque: String
        local_embarque: String
        local_despacho: String
    }

    type NfeReferencesEcfItem {
        modelo: String
        n_ecf: Int
        n_coo: Int
    }

    type NfeReferences {
        nfes: [String]
        ctes: [String]
        ecfs: [NfeReferencesEcfItem]
    }
`;

const COMMON_NFE_COMPANY_INPUT = gql`
    input NfeCompanyAddressInput {
        postcode: String!
        street: String!
        number: String!
        complement: String!
        neighborhood: String!
        city: String!
        state: String!
    }

    input NfeCompanyTaxSettingsInput {
        ibpt: String
        informacoes_fisco: String
        orientacao_danfe: String
        nfe_serie: Int
        nfe_numero: Int
        nfe_numero_dev: Int
        nfce_serie: Int
        nfce_numero: Int
        nfce_numero_dev: String
        nfce_id_csc: String
        nfce_codigo_csc: String
        nfce_id_csc_dev: String
        nfce_codigo_csc_dev: String
    }

    input NfeCompanyCertificateInput {
        base64: String
        password: String
    }

    input NfeCompanyEmitterCredentialsInput {
        consumer_key: String
        consumer_secret: String
        access_token: String
        access_token_secret: String
    }

    input NfeCompanyListOptions
`;

const CREATE_NFE_COMPANY_INPUT = gql`
    input CreateNfeCompanyInput {
        ownerName: String!
        corporateName: String!
        email: String!
        phone: String!
        tradeName: String
        accounting: String
        subdomain: String
        logoUrl: String
        cpf: String!
        cnpj: String!
        ie: String!
        unit: NfeCompanyUnit!
        address: NfeCompanyAddressInput!
        taxSettings: NfeCompanyTaxSettingsInput
        certificate: NfeCompanyCertificateInput
        emitterCredentials: NfeCompanyEmitterCredentialsInput
    }
`;

const UPDATE_NFE_COMPANY_INPUT = gql`
    input UpdateNfeCompanyInput {
        id: ID!
        ownerName: String!
        corporateName: String!
        email: String!
        phone: String!
        tradeName: String
        accounting: String
        subdomain: String
        logoUrl: String
        cpf: String!
        cnpj: String!
        ie: String!
        unit: NfeCompanyUnit!
        address: NfeCompanyAddressInput!
        taxSettings: NfeCompanyTaxSettingsInput
        certificate: NfeCompanyCertificateInput
        emitterCredentials: NfeCompanyEmitterCredentialsInput
    }
`;

const COMMON_NFE_SETTING_INPUT = gql`
    input NfeSettingPaymentMethodInput {
        pagamento: Int!
        forma_pagamento: String
        tipo_integracao: Int!
        cnpj_credenciadora: String
    }

    input NfeSettingShippingMethodInput {
        cnpj: String
        razao_social: String
        ie: String
        cpf: String
        nome_completo: String
        endereco: String
        uf: String
        cidade: String
        cep: String
        placa: String
        uf_veiculo: String
        rntc: String
        reboque: NfeSettingShippingMethodReboqueInput
    }

    input NfeSettingShippingMethodReboqueInput {
        placa: String
        uf_veiculo: String
        rntc: String
        vagao: String
        balsa: String
    }

    input NfeSettingCustomItemInput {
        key: String!
        value: String!
    }

    input NfeSettingCustomInput {
        set: [NfeSettingCustomItemInput!]!
    }

    input NfeSettingListOptions
`;

const CREATE_NFE_SETTING_INPUT = gql`
    input CreateNfeSettingPaymentMethodInput {
        data: NfeSettingPaymentMethodInput!
        methodId: ID!
    }

    input CreateNfeSettingShippingMethodInput {
        data: NfeSettingShippingMethodInput!
        methodId: ID!
    }

    input CreateNfeSettingCustomInput {
        data: NfeSettingCustomInput!
    }
`;

const UPDATE_NFE_SETTING_INPUT = gql`
    input UpdateNfeSettingPaymentMethodInput {
        id: ID!
        data: NfeSettingPaymentMethodInput!
    }

    input UpdateNfeSettingShippingMethodInput {
        id: ID!
        data: NfeSettingShippingMethodInput!
    }

    input UpdateNfeSettingCustomInput {
        id: ID!
        data: NfeSettingCustomInput!
    }
`;

const COMMON_NFE_PROCUCT_INPUT = gql`
    input NfeProductInput {
        info: NfeProductInfoInput!
        taxes: NfeProductTaxesInput
        additionalInfo: NfeProductAdditionalInfoInput
        specificDetailing: NfeProductSpecificDetailingInput
        orderLine: NfeProductOrderLineInput!
    }

    input NfeProductInfoInput {
        item: Int
        nome: String!
        codigo: String!
        ncm: String!
        quantidade: Float!
        unidade: String!
        peso: Float!
        origem: Int!
        desconto: Float!
        subtotal: Float!
        total: Float!
        classe_imposto: String
        detalhamento_especifico: String
    }

    input NfeProductTaxesIcmsInput {
        codigo_cfop: String
        situacao_tributaria: String
        aliquota_importacao: Float
        industria: Int
        aliquota_credito: Float
        aliquota_mva: Float
        aliquota_reducao: Float
        aliquota_reducao_st: Float
        aliquota_efetiva_icms: Float
        aliquota_efetiva_icms_st: Float
        aliquota_diferimento: Float
        aliquota_fcp_retido: Float
        aliquota_st_retido: Float
        bc_st_retido: Float
        icms_efetivo: Float
        valor_st_retido: Float
        valor_icms_substituto: Float
        valor_fcp_retido: Float
        motivo_desoneracao: Int
        pauta_fiscal: Float
    }

    input NfeProductTaxesIpiInput {
        situacao_tributaria: String
        codigo_enquadramento: String
        aliquota: Float
        percentual_devolvido: Float
        ipi_devolvido: Float
        codigo_selo: String
        qtd_selo: Int
    }

    input NfeProductTaxesPisInput {
        situacao_tributaria: String
        aliquota: Float
    }

    input NfeProductTaxesCofinsInput {
        situacao_tributaria: String
        aliquota: Float
    }

    input NfeProductTaxesWithholdingInput {
        valor_pis: Float
        valor_cofins: Float
        valor_csll: Float
        bc_irrf: Float
        valor_irrf: Float
        bc_previdencia: Float
        valor_previdencia: Float
    }

    input NfeProductTaxesImportationInput {
        aliquota: Float
        iof: Float
    }

    input NfeProductTaxesInput {
        icms: NfeProductTaxesIcmsInput
        ipi: NfeProductTaxesIpiInput
        pis: NfeProductTaxesPisInput
        cofins: NfeProductTaxesCofinsInput
        retencao_tributos: NfeProductTaxesWithholdingInput
        importacao: NfeProductTaxesImportationInput
    }

    input NfeProductAdditionalInfoTraceInput {
        lote: String
        quantidade: Int
        data_fabricacao: Date
        data_validade: Date
    }

    input NfeProductAdditionalInfoInput {
        unidade_tributavel: String
        informacoes_adicionais: String
        beneficio_fiscal: String
        ind_escala: String
        cnpj_fabricante: String
        gtin: String
        gtin_tributavel: String
        cest: String
        nve: String
        nrecopi: String
        ativo_permanente: Boolean
        ex_ipi: String
        rastro: NfeProductAdditionalInfoTraceInput
    }

    input NfeProductAdditionalInfoMedicamentInput {
        codigo_anvisa: String
        pmc: Float
    }

    input NfeProductAdditionalInfoFuelInput {
        codigo_anp: Int
        descricao_anp: Int
        uf_consumo: String
        percentual_glp: Float
        percentual_gnn: Float
        percentual_gni: Float
        partida: Float
        codif: Int
        qtd_temperatura: Float
        bc_cide: Float
        valor_cide: Float
        bico: Float
        bomba: Float
        tanque: Float
        encerrante_inicio: Float
        encerrante_final: Float
    }

    input NfeProductSpecificDetailingInput {
        medicamento: NfeProductAdditionalInfoMedicamentInput
        combustiveis: NfeProductAdditionalInfoFuelInput
    }

    input NfeProductOrderLineInput {
        id: ID!
    }
`;

const COMMON_NFE_INPUT = gql`
    input NfeInfoInput {
        operacao: Int!
        natureza_operacao: String!
        modelo: Int!
        presenca: Int!
        intermediador: Int!
        frete: Float!
        desconto: Float!
        total: Float!
        data_emissao: DateTime
        data_entrada_saida: DateTime
        despesas_acessorias: Float
        despesas_aduaneiras: Float
        informacoes_fisco: String
        informacoes_complementares: String
        observacoes_contribuinte: String
    }

    input NfeRecipientInput {
        tipo_pessoa: String
        nome_completo: String
        cpf: String
        cnpj: String
        razao_social: String
        ie: String
        suframa: String
        substituto_tributario: String
        consumidor_final: Int
        contribuinte: String
        telefone: String
        email: String
        id_estrangeiro: String
        nome_estrangeiro: String
        codigo_pais: String
        nome_pais: String
        logradouro: String
        numero: String
        complemento: String
        bairro: String
        cidade: String
        uf: String
        cep: String
    }

    input NfePaymentInvoiceInput {
        numero: String
        valor: Float
        desconto: Float
        valor_liquido: Float
    }

    input NfePaymentInstallmentsInput {
        vencimento: Date
        valor: Float
    }

    input NfePaymentInput {
        fatura: NfePaymentInvoiceInput
        parcelas: [NfePaymentInstallmentsInput]
    }

    input NfeTransportInput {
        modalidade: Int!
        volume: String
        especie: String
        peso_bruto: Float
        peso_liquido: Float
        total: Float
        marca: String
        numeracao: String
        lacres: String
    }

    input NfeExportationInput {
        uf_embarque: String
        local_embarque: String
        local_despacho: String
    }

    input NfeReferencesEcfItemInput {
        modelo: String
        n_ecf: Int
        n_coo: Int
    }

    input NfeReferencesInput {
        nfes: [String]
        ctes: [String]
        ecfs: [NfeReferencesEcfItemInput]
    }

    input NfeOrderInput {
        id: ID!
    }
`;

const CREATE_NFE_INPUT = gql`
    input CreateNfeInput {
        series: String
        number: String
        receipt: String
        key: String
        xml: String
        danfe: String
        info: NfeInfoInput!
        recipient: NfeRecipientInput!
        transport: NfeTransportInput
        payment: NfePaymentInput!
        exportation: NfeExportationInput
        references: NfeReferencesInput
        order: NfeOrderInput!
        products: [NfeProductInput!]
    }
`;

const UPDATE_NFE_INPUT = gql`
    input UpdateNfeInput {
        id: ID!
        series: String
        number: String
        receipt: String
        key: String
        xml: String
        danfe: String
        info: NfeInfoInput!
        recipient: NfeRecipientInput!
        transport: NfeTransportInput
        payment: NfePaymentInput!
        exportation: NfeExportationInput
        references: NfeReferencesInput
        products: [NfeProductInput!]
    }
`;

export const commonApiExtensions = gql`
    scalar Date

    enum NfeState {
        Created
        Authorized
        Denied
        Correcting
        Corrected
        Canceled
    }

    extend type Order {
        nfes(options: NfeListOptions): NfeList!
    }

    type NfeList implements PaginatedList {
        items: [Nfe!]!
        totalItems: Int!
    }

    input NfeListOptions
`;

export const nfeAdminApiExtension = gql`
    ${commonApiExtensions}

    ${NFE}
    ${NFE_COMPANY}
    ${NFE_SETTING}
    ${NFE_OPERATION}
    ${NFE_PRODUCT}

    ${COMMON_NFE_COMPANY_INPUT}
    ${CREATE_NFE_COMPANY_INPUT}
    ${UPDATE_NFE_COMPANY_INPUT}

    ${COMMON_NFE_SETTING_INPUT}
    ${CREATE_NFE_SETTING_INPUT}
    ${UPDATE_NFE_SETTING_INPUT}

    ${COMMON_NFE_PROCUCT_INPUT}
    ${COMMON_NFE_INPUT}
    ${CREATE_NFE_INPUT}
    ${UPDATE_NFE_INPUT}

    extend type Query {
        orderNfe(id: ID!): Nfe

        nfeCompany(id: ID!): NfeCompany
        nfeCompanyByChannel(id: ID!): NfeCompany
        nfeCompanies(options: NfeCompanyListOptions): NfeCompanyList!

        nfeSetting(id: ID!): NfeSetting
        nfeSettings(options: NfeSettingListOptions): NfeSettingList!
        nfeSettingByTypeAndMethodId(type: String!, id: ID!): NfeSetting
    }

    extend type Mutation {
        createNfeCompany(input: CreateNfeCompanyInput!): NfeCompany!
        updateNfeCompany(input: UpdateNfeCompanyInput!): NfeCompany!

        createNfeSettingPaymentMethod(input: CreateNfeSettingPaymentMethodInput!): NfeSetting!
        updateNfeSettingPaymentMethod(input: UpdateNfeSettingPaymentMethodInput!): NfeSetting!

        createNfeSettingShippingMethod(input: CreateNfeSettingShippingMethodInput!): NfeSetting!
        updateNfeSettingShippingMethod(input: UpdateNfeSettingShippingMethodInput!): NfeSetting!

        createNfeSettingCustom(input: CreateNfeSettingCustomInput!): NfeSetting!
        updateNfeSettingCustom(input: UpdateNfeSettingCustomInput!): NfeSetting!

        createOrderNfe(input: CreateNfeInput!): Nfe!
        updateOrderNfe(input: UpdateNfeInput!): Nfe!

        emitNfe(id: ID!): NfeOperationResponse!
        cancelNfe(id: ID!): NfeOperationResponse!
        emitNfeCorrectionLetter(id: ID!): NfeOperationResponse!
    }
`;

export const nfeShopApiExtension = gql`
    ${commonApiExtensions}

    type Nfe implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        state: NfeState!
        series: String
        number: String
        receipt: String
        key: String
        xml: String
        danfe: String
        order: Order!
    }
`;
