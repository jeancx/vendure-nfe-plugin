import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';

import { GetNfeCompanyList, SortOrder } from '../../generated-types';
import { GET_NFE_COMPANY_LIST } from './nfe-company-list.graphql';

@Component({
    selector: 'zhf-nfe-company-list',
    templateUrl: './nfe-company-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NfeCompanyListComponent extends BaseListComponent<GetNfeCompanyList.Query, GetNfeCompanyList.Items> {
    constructor(private dataService: DataService, router: Router, route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query(GET_NFE_COMPANY_LIST, args);
            },
            data => data.nfeCompanies,
            (skip, take) => {
                return {
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                    },
                };
            },
        );
    }
}
