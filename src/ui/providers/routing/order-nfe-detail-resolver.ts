import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationStart, ResolveData, Router } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { NfeFormHelper } from '../../components/nfe-form/nfe-form.helper';

import { GetNfe, CreateNfeInput } from '../../generated-types';
import { GET_NFE } from './schemas.graphql';

@Injectable()
export class OrderNfeDetailResolver implements ResolveData {
    constructor(private router: Router, private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<CreateNfeInput | GetNfe.OrderNfe | undefined | null> {
        const navigateAway$ = this.router.events.pipe(filter(event => event instanceof ActivationStart));

        const id = route.paramMap.get('id') || '';
        const orderId = route.paramMap.get('orderId') || '';
        const stream = id === 'create' ? this.newNfe(orderId) : this.getNfe(id);

        const firstPipe = [takeUntil(navigateAway$), filter(notNullOrUndefined), shareReplay(1)];
        const secondPipe = [take(1), map(() => stream)];

        // eslint-disable-next-line
        // @ts-ignore
        return stream.pipe(...firstPipe).pipe(...secondPipe);
    }

    newNfe(orderId: string): Observable<CreateNfeInput> {
        return NfeFormHelper.getOrderMappedtoNfeStream(this.dataService, orderId);
    }

    getNfe(id: string): Observable<GetNfe.OrderNfe | undefined | null> {
        return this.dataService.query<GetNfe.Query, GetNfe.Variables>(GET_NFE, { id }).mapStream(data => data.orderNfe);
    }
}
