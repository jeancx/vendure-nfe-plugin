import gql from 'graphql-tag';

export const GET_PAYMENT_METHOD_LIST = gql`
    query GetPaymentMethodList($options: PaymentMethodListOptions!) {
        paymentMethods(options: $options) {
            items {
                ...PaymentMethodListItem
            }
            totalItems
        }
    }

    fragment PaymentMethodListItem on PaymentMethod {
        id
        createdAt
        updatedAt
        name
        description
        code
        enabled
    }
`;

export const GET_SHIPPING_METHOD_LIST = gql`
    query GetShippingMethodList($options: ShippingMethodListOptions) {
        shippingMethods(options: $options) {
            items {
                ...ShippingMethodListItem
            }
            totalItems
        }
    }

    fragment ShippingMethodListItem on ShippingMethod {
        id
        createdAt
        updatedAt
        code
        name
        description
        fulfillmentHandlerCode
    }
`;
