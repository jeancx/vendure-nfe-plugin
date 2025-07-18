import gql from 'graphql-tag';

import { NFE_FRAGMENT, NFE_OPERATION_RESPONSE_FRAGMENT } from '../../common';

export const CREATE_NFE = gql`
    mutation CreateNfe($input: CreateNfeInput!) {
        createOrderNfe(input: $input) {
            ...Nfe
        }
    }
    ${NFE_FRAGMENT}
`;

export const UPDATE_NFE = gql`
    mutation UpdateNfe($input: UpdateNfeInput!) {
        updateOrderNfe(input: $input) {
            ...Nfe
        }
    }
    ${NFE_FRAGMENT}
`;

export const EMIT_NFE = gql`
    mutation EmitNfe($id: ID!) {
        emitNfe(id: $id) {
            ...NfeOperationResponse
        }
    }
    ${NFE_OPERATION_RESPONSE_FRAGMENT}
`;

export const EMIT_CORRECTION_LETTER = gql`
    mutation EmitCorrectionLetter($id: ID!) {
        emitNfeCorrectionLetter(id: $id) {
            ...NfeOperationResponse
        }
    }
    ${NFE_OPERATION_RESPONSE_FRAGMENT}
`;

export const CANCEL_NFE = gql`
    mutation CancelNfe($id: ID!) {
        cancelNfe(id: $id) {
            ...NfeOperationResponse
        }
    }
    ${NFE_OPERATION_RESPONSE_FRAGMENT}
`;
