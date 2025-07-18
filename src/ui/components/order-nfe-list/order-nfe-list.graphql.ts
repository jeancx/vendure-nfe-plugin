import gql from 'graphql-tag';

import { NFE_LIST_ITEM_FRAGMENT } from '../../common';

export const GET_NFE_LIST_FOR_ORDER = gql`
    query GetNfesForOrder($orderId: ID!, $options: NfeListOptions) {
        order(id: $orderId) {
            id
            code
            nfes(options: $options) {
                items {
                    ...NfeListItem
                }
                totalItems
            }
        }
    }
    ${NFE_LIST_ITEM_FRAGMENT}
`;
