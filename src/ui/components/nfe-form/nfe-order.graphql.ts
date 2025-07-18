import gql from 'graphql-tag';

const NFE_ORDER_ADDRESS_FRAGMENT = gql`
    fragment NfeOrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
    }
`;

const NFE_ORDER_ADJUSTMENT_FRAGMENT = gql`
    fragment NfeOrderDiscount on Discount {
        adjustmentSource
        amount
        description
        type
    }
`;

const NFE_ORDER_CUSTOMER_FRAGMENT = gql`
    fragment NfeOrderCustomer on Customer {
        id
        firstName
        lastName
        phoneNumber
        emailAddress
        customFields {
            cpf
            cnpj
            corporateName
            ie
            suframa
        }
    }
`;

const NFE_ORDER_FULFILLMENT_FRAGMENT = gql`
    fragment NfeOrderFulfillment on Fulfillment {
        id
        state
        createdAt
        updatedAt
        method
        orderItems {
            id
        }
        trackingCode
    }
`;

const NFE_ORDER_LINE_FRAGMENT = gql`
    fragment NfeOrderLine on OrderLine {
        id
        productVariant {
            id
            name
            sku
            product {
                customFields {
                    ncm
                    unit
                    taxableUnit
                    origin
                }
            }
        }
        discounts {
            ...NfeOrderDiscount
        }
        unitPrice
        unitPriceWithTax
        discountedUnitPrice
        discountedUnitPriceWithTax
        proratedUnitPrice
        proratedUnitPriceWithTax
        quantity
        linePrice
        lineTax
        linePriceWithTax
        discountedLinePrice
        discountedLinePriceWithTax
        items {
            id
            unitPrice
            unitPriceWithTax
            taxRate
            refundId
            cancelled
            fulfillment {
                ...NfeOrderFulfillment
            }
        }
    }
`;

const NFE_ORDER_PAYMENT_FRAGMENT = gql`
    fragment NfeOrderPayment on Payment {
        id
        createdAt
        transactionId
        amount
        method
        state
        metadata
        refunds {
            id
            createdAt
            state
            items
            adjustment
            total
            paymentId
            reason
            transactionId
            method
            metadata
            orderItems {
                id
            }
        }
    }
`;

const NFE_ORDER_PROMOTION_FRAGMENT = gql`
    fragment NfeOrderPromotion on Promotion {
        id
        couponCode
        name
    }
`;

const NFE_ORDER_SHIPPING_LINE_FRAGMENT = gql`
    fragment NfeOrderShippingLine on ShippingLine {
        price
        priceWithTax
        discountedPrice
        discountedPriceWithTax
        shippingMethod {
            id
            code
            name
            fulfillmentHandlerCode
            description
        }
    }
`;

const NFE_ORDER_SURCHARGE_FRAGMENT = gql`
    fragment NfeOrderSurcharge on Surcharge {
        id
        sku
        description
        price
        priceWithTax
        taxRate
    }
`;

const NFE_ORDER_TAX_SUMMARY_FRAGMENT = gql`
    fragment NfeOrderTaxSummary on OrderTaxSummary {
        description
        taxRate
        taxBase
        taxTotal
    }
`;

export const NFE_ORDER_FRAGMENT = gql`
    fragment NfeOrder on Order {
        id
        code
        state
        active
        customer {
            ...NfeOrderCustomer
        }
        lines {
            ...NfeOrderLine
        }
        surcharges {
            ...NfeOrderSurcharge
        }
        discounts {
            ...NfeOrderDiscount
        }
        promotions {
            ...NfeOrderPromotion
        }
        subTotal
        subTotalWithTax
        total
        totalWithTax
        currencyCode
        shipping
        shippingWithTax
        shippingLines {
            ...NfeOrderShippingLine
        }
        taxSummary {
            ...NfeOrderTaxSummary
        }
        shippingAddress {
            ...NfeOrderAddress
        }
        billingAddress {
            ...NfeOrderAddress
        }
        payments {
            ...NfeOrderPayment
        }
        fulfillments {
            ...NfeOrderFulfillment
        }
    }
    ${NFE_ORDER_ADDRESS_FRAGMENT}
    ${NFE_ORDER_ADJUSTMENT_FRAGMENT}
    ${NFE_ORDER_CUSTOMER_FRAGMENT}
    ${NFE_ORDER_FULFILLMENT_FRAGMENT}
    ${NFE_ORDER_LINE_FRAGMENT}
    ${NFE_ORDER_PAYMENT_FRAGMENT}
    ${NFE_ORDER_PROMOTION_FRAGMENT}
    ${NFE_ORDER_SHIPPING_LINE_FRAGMENT}
    ${NFE_ORDER_SURCHARGE_FRAGMENT}
    ${NFE_ORDER_TAX_SUMMARY_FRAGMENT}
`;

export const GET_NFE_ORDER = gql`
    query GetNfeOrder($id: ID!) {
        order(id: $id) {
            ...NfeOrder
        }
    }
    ${NFE_ORDER_FRAGMENT}
`;
