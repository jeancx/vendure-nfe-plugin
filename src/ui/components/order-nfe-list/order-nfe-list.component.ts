import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';

import { GetNfesForOrder, SortOrder } from '../../generated-types';
import { GET_NFE_LIST_FOR_ORDER } from './order-nfe-list.graphql';

@Component({
    selector: 'zhf-order-nfe-list',
    templateUrl: './order-nfe-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderNfeListComponent
    extends BaseListComponent<GetNfesForOrder.Query, GetNfesForOrder.Items, GetNfesForOrder.Variables>
    implements OnInit
{
    private orderHaveNfes: boolean;

    constructor(private dataService: DataService, router: Router, route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => this.dataService.query(GET_NFE_LIST_FOR_ORDER, args),
            data => data.order?.nfes || { items: [], totalItems: 0 },
            (skip, take) => {
                return {
                    orderId: route.snapshot.paramMap.get('orderId') || '',
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
        this.orderHaveNfes = false;
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.items$.subscribe(results => {
            if (!this.orderHaveNfes && results.length === 0) {
                this.router.navigate(['./create'], { relativeTo: this.route });
            } else {
                this.orderHaveNfes = true;
            }
        });
    }
}
