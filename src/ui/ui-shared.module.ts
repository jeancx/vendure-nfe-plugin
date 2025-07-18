import { NgModule } from '@angular/core';
import { addActionBarItem, addNavMenuSection, Permission, SharedModule } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule],
    providers: [
        addNavMenuSection(
            {
                id: 'nfe-extension',
                label: 'breadcrumb.nfe',
                collapsible: true,
                collapsedByDefault: false,
                requiresPermission: Permission.SuperAdmin,
                items: [
                    {
                        id: 'nfe-companies',
                        label: 'breadcrumb.nfe-companies',
                        routerLink: ['/extensions/nfe/companies'],
                        icon: 'store',
                    },
                    {
                        id: 'nfe-settings',
                        label: 'breadcrumb.nfe-settings',
                        routerLink: ['/extensions/nfe/settings'],
                        icon: 'store',
                    },
                ],
            },
            'settings',
        ),
        addActionBarItem({
            id: 'order-nfes',
            label: 'common.nfes',
            locationId: 'order-detail',
            buttonStyle: 'outline',
            routerLink: route => ['/extensions/nfe/orders', route.snapshot.paramMap.get('id'), 'nfes'],
            requiresPermission: Permission.SuperAdmin,
        }),
    ],
})
export class NfeUiSharedModule {}
