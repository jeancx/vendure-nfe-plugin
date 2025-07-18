import gql from 'graphql-tag';

import { NFE_COMPANY_LIST_ITEM_FRAGMENT } from '../../common';

export const GET_NFE_COMPANY_LIST = gql`
    query GetNfeCompanyList($options: NfeCompanyListOptions) {
        nfeCompanies(options: $options) {
            items {
                ...NfeCompanyListItem
            }
            totalItems
        }
    }
    ${NFE_COMPANY_LIST_ITEM_FRAGMENT}
`;
