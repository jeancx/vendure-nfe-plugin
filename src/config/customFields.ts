import { LanguageCode } from '@vendure/core';

export const customFields = {
    Product: [
        {
            name: 'ncm',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'NCM' },
                { languageCode: LanguageCode.pt_BR, value: 'NCM' },
            ],
            description: [
                { languageCode: LanguageCode.en, value: 'NCM Code' },
                { languageCode: LanguageCode.pt_BR, value: 'Código NCM' },
            ],
        },
        {
            name: 'unit',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'Unit' },
                { languageCode: LanguageCode.pt_BR, value: 'Unidade' },
            ],
            description: [
                { languageCode: LanguageCode.en, value: 'Unit' },
                { languageCode: LanguageCode.pt_BR, value: 'Unidade' },
            ],
        },
        {
            name: 'taxableUnit',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'Taxable unit' },
                { languageCode: LanguageCode.pt_BR, value: 'Unidade tributável' },
            ],
            description: [
                { languageCode: LanguageCode.en, value: 'Taxable unit' },
                { languageCode: LanguageCode.pt_BR, value: 'Unidade tributável' },
            ],
        },
        {
            name: 'origin',
            type: 'int',
            label: [
                { languageCode: LanguageCode.en, value: 'Origin' },
                { languageCode: LanguageCode.pt_BR, value: 'Origem' },
            ],
            description: [
                { languageCode: LanguageCode.en, value: 'Origin' },
                {
                    languageCode: LanguageCode.pt_BR,
                    value: `0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8
    1 - Estrangeira - Importação direta, exceto a indicada no código 6
    2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7
    3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%
    4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes
    5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%
    6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural
    7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural
    8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%`,
                },
            ],
        },
    ],
    Customer: [
        {
            name: 'cpf',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'CPF' },
                { languageCode: LanguageCode.pt_BR, value: 'CPF' },
            ],
        },
        {
            name: 'cnpj',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'CNPJ' },
                { languageCode: LanguageCode.pt_BR, value: 'CNPJ' },
            ],
        },
        {
            name: 'corporateName',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'Corporate Name' },
                { languageCode: LanguageCode.pt_BR, value: 'Razão Social' },
            ],
        },
        {
            name: 'ie',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'IE' },
                { languageCode: LanguageCode.pt_BR, value: 'IE' },
            ],
        },
        {
            name: 'suframa',
            type: 'string',
            label: [
                { languageCode: LanguageCode.en, value: 'SUFRAMA' },
                { languageCode: LanguageCode.pt_BR, value: 'SUFRAMA' },
            ],
        },
    ],
};
