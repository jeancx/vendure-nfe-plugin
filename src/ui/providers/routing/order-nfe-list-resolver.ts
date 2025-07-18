import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';

import { GetOrderCode } from '../../generated-types';
import { GET_ORDER_CODE } from './schemas.graphql';

@Injectable()
export class OrderNfeListResolver implements Resolve<Observable<GetOrderCode.Order | undefined | null>> {
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<GetOrderCode.Order | undefined | null> {
        return this.dataService
            .query<GetOrderCode.Query, GetOrderCode.Variables>(GET_ORDER_CODE, {
                id: route.paramMap.get('orderId') || '',
            })
            .mapSingle(data => data.order);
    }
}
