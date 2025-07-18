import gql from 'graphql-tag';

import { NFE_COMPANY_FRAGMENT } from '../../common';

export const CREATE_NFE_COMPANY = gql`
    mutation CreateNfeCompany($input: CreateNfeCompanyInput!) {
        createNfeCompany(input: $input) {
            ...NfeCompany
        }
    }
    ${NFE_COMPANY_FRAGMENT}
`;

export const UPDATE_NFE_COMPANY = gql`
    mutation UpdateNfeCompany($input: UpdateNfeCompanyInput!) {
        updateNfeCompany(input: $input) {
            ...NfeCompany
        }
    }
    ${NFE_COMPANY_FRAGMENT}
`;
