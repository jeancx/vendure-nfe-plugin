import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseEntityResolver, DataService } from '@vendure/admin-ui/core';

import { GetNfeCompany, NfeCompany, NfeCompanyFragment, NfeCompanyUnit } from '../../generated-types';
import { GET_NFE_COMPANY } from './schemas.graphql';

@Injectable()
export class NfeCompanyDetailResolver extends BaseEntityResolver<NfeCompanyFragment> {
    constructor(router: Router, dataService: DataService) {
        super(
            router,
            {
                __typename: 'NfeCompany',
                id: '',
                createdAt: undefined,
                updatedAt: undefined,
                ownerName: 'Odirlon Herartt',
                cpf: '07604999930',
                unit: NfeCompanyUnit.Matriz,
                corporateName: 'UNICA BRASIL INDUSTRIA E COMERCIO DE CALCADOS EIRELI\n',
                tradeName: 'UNICA BRASIL',
                cnpj: '18.719.593/0001-06',
                ie: '257128735',
                accounting: '',
                subdomain: '',
                logoUrl: '',
                email: 'contato@proveit.com.br',
                phone: '(48) 3265-2719',
                address: {
                    postcode: '88240-000',
                    street: 'RUA DORVINO MANOEL RACHADEL',
                    number: '105',
                    complement: '',
                    neighborhood: 'CENTRO',
                    city: 'São João Batista',
                    state: 'SC',
                },
            },
            id =>
                dataService
                    .query<GetNfeCompany.Query, GetNfeCompany.Variables>(GET_NFE_COMPANY, { id })
                    .mapStream(data => data.nfeCompany),
        );
    }
}
