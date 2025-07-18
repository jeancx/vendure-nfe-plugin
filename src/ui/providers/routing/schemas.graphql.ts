import gql from 'graphql-tag';

import { NFE_COMPANY_FRAGMENT, NFE_FRAGMENT } from '../../common';

export const GET_ORDER_CODE = gql`
    query GetOrderCode($id: ID!) {
        order(id: $id) {
            id
            code
        }
    }
`;

export const GET_NFE = gql`
    query GetNfe($id: ID!) {
        orderNfe(id: $id) {
            ...Nfe
        }
    }
    ${NFE_FRAGMENT}
`;

export const GET_NFE_COMPANY = gql`
    query GetNfeCompany($id: ID!) {
        nfeCompany(id: $id) {
            ...NfeCompany
        }
    }
    ${NFE_COMPANY_FRAGMENT}
`;
