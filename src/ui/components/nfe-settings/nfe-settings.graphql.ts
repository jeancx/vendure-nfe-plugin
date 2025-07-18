import gql from 'graphql-tag';
import { NFE_SETTING_FRAGMENT } from '../../common';

export const GET_NFE_SETTING = gql`
    query GetNfeSetting($id: ID!) {
        nfeSetting(id: $id) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const GET_NFE_SETTING_LIST = gql`
    query GetNfeSettings($options: NfeSettingListOptions) {
        nfeSettings(options: $options) {
            items {
                ...NfeSetting
            }
            totalItems
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const CREATE_NFE_SETTING_PAYMENT_METHOD = gql`
    mutation CreateNfeSettingPaymentMethod($input: CreateNfeSettingPaymentMethodInput!) {
        createNfeSettingPaymentMethod(input: $input) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const UPDATE_NFE_SETTING_PAYMENT_METHOD = gql`
    mutation UpdateNfeSettingPaymentMethod($input: UpdateNfeSettingPaymentMethodInput!) {
        updateNfeSettingPaymentMethod(input: $input) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const CREATE_NFE_SETTING_SHIPPING_METHOD = gql`
    mutation CreateNfeSettingShippingMethod($input: CreateNfeSettingShippingMethodInput!) {
        createNfeSettingShippingMethod(input: $input) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const UPDATE_NFE_SETTING_SHIPPING_METHOD = gql`
    mutation UpdateNfeSettingShippingMethod($input: UpdateNfeSettingShippingMethodInput!) {
        updateNfeSettingShippingMethod(input: $input) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const CREATE_NFE_SETTING_CUSTOM_SET = gql`
    mutation CreateNfeSettingCustom($input: CreateNfeSettingCustomInput!) {
        createNfeSettingCustom(input: $input) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;

export const UPDATE_NFE_SETTING_CUSTOM_SET = gql`
    mutation UpdateNfeSettingCustom($input: UpdateNfeSettingCustomInput!) {
        updateNfeSettingCustom(input: $input) {
            ...NfeSetting
        }
    }
    ${NFE_SETTING_FRAGMENT}
`;
