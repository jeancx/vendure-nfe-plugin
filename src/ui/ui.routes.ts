import { Route } from '@angular/router';
import { createResolveData } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import {
    NfeCompanyDetailComponent,
    NfeCompanyListComponent,
    OrderNfeDetailComponent,
    OrderNfeListComponent,
    NfeSettingsComponent,
} from './components';
import { GetNfe, GetOrderCode } from './generated-types';
import { NfeCompanyDetailResolver, OrderNfeDetailResolver, OrderNfeListResolver } from './providers';

type Breadcrumb = {
    label: string;
    link: any[];
}[];

export const nfeUiRoutes: Route[] = [
    {
        path: 'companies',
        pathMatch: 'full',
        component: NfeCompanyListComponent,
        data: { breadcrumb: 'breadcrumb.nfe-companies' },
    },
    {
        path: 'companies/:id',
        pathMatch: 'full',
        component: NfeCompanyDetailComponent,
        resolve: createResolveData(NfeCompanyDetailResolver),
        data: { breadcrumb: 'breadcrumb.nfe-companies' },
    },
    {
        path: 'settings',
        pathMatch: 'full',
        component: NfeSettingsComponent,
        data: { breadcrumb: 'breadcrumb.nfe-settings' },
    },
    {
        path: 'orders/:orderId/nfes',
        pathMatch: 'full',
        component: OrderNfeListComponent,
        resolve: { data: OrderNfeListResolver },
        data: { breadcrumb: orderNfesBreadcrumb },
    },
    {
        path: 'orders/:orderId/nfes/:id',
        component: OrderNfeDetailComponent,
        resolve: { entity: OrderNfeDetailResolver },
        data: { breadcrumb: orderNfeDetailBreadcrumb },
    },
];

function orderNfesBreadcrumb(resolved: { data: GetOrderCode.Order }, params: Record<string, string>): Breadcrumb {
    return [
        {
            label: 'breadcrumb.orders',
            link: ['orders'],
        },
        {
            label: `${resolved.data.code}`,
            link: ['orders', params.orderId],
        },
        {
            label: 'Notas Fiscais',
            link: [''],
        },
    ];
}

function orderNfeDetailBreadcrumb(
    resolved: { entity: Observable<GetNfe.OrderNfe> },
    params: Record<string, string>,
): Breadcrumb {
    return [
        {
            label: 'breadcrumb.orders',
            link: ['orders'],
        },
        {
            label: `#${params.orderId}`,
            link: ['orders', params.orderId],
        },
        {
            label: 'Notas Fiscais',
            link: ['extensions', 'nfe', 'orders', params.orderId, 'nfes'],
        },
        {
            label: 'Criar',
            link: [''],
        },
    ];
}
