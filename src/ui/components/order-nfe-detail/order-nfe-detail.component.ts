import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, DataService, NotificationService, ServerConfigService, PermissionsService } from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, mapTo, switchMap } from 'rxjs/operators';

import { NfeState } from '../../common';
import { CreateNfe, EmitNfe, Nfe, UpdateNfe } from '../../generated-types';
import { NfeFormHelper } from '../nfe-form/nfe-form.helper';
import { CREATE_NFE, EMIT_NFE, UPDATE_NFE } from './order-nfe-detail.graphql';

@Component({
    selector: 'zhf-order-nfe-detail',
    templateUrl: './order-nfe-detail.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class OrderNfeDetailComponent extends BaseDetailComponent<Nfe.Fragment> implements OnInit {
    detailForm: FormGroup;
    nfeState: NfeState;
    operationErrorMessage: string;

    constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
        protected permissionsService: PermissionsService,
    ) {
        super(route, router, serverConfigService, dataService, permissionsService);

        this.detailForm = NfeFormHelper.buildNfeFormGroup();
    }

    ngOnInit(): void {
        this.init();
    }

    saveButtonEnabled(): boolean {
        return this.detailForm.valid;
    }

    operationEnabled(operation: string): boolean {
        return (
            (operation === 'emitNfe' && ['Created'].includes(this.nfeState)) ||
            (operation === 'emitCorrectionLetter' && ['Correcting'].includes(this.nfeState)) ||
            (operation === 'cancelNfe' && ['Authorized', 'Correcting', 'Corrected'].includes(this.nfeState))
        );
    }

    create(): void {
        if (!this.detailForm) return;

        const nfe = NfeFormHelper.prepareFormValuesToCreate(this.detailForm);

        this.dataService.mutate<CreateNfe.Mutation, CreateNfe.Variables>(CREATE_NFE, { input: nfe }).subscribe(
            data => {
                this.notificationService.success('common.notify-create-success', {
                    entity: 'Nfe',
                });
                this.detailForm.markAsPristine();
                this.changeDetector.markForCheck();

                this.router.navigate(['../', data.createOrderNfe.id], { relativeTo: this.route });
            },
            () => {
                this.notificationService.error('common.notify-create-error', {
                    entity: 'Nfe',
                });
            },
        );
    }

    save(): void {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Nfe',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Nfe',
                    });
                },
            );
    }

    showErrorAlert(sefaz: string): void {
        try {
            const sefazResponse = JSON.parse(sefaz);

            this.operationErrorMessage = Array.isArray(sefazResponse?.aProt)
                ? (this.operationErrorMessage = sefazResponse.aProt
                      .map(({ cStat, xMotivo }: { cStat: string; xMotivo: string }) => `Código: ${cStat} - ${xMotivo}`)
                      .join('\n'))
                : JSON.stringify(sefazResponse, null, 4);
        } catch (e) {
            this.operationErrorMessage = sefaz;
        }
    }

    emitNfe(): void {
        this.saveChanges()
            .pipe(
                switchMap(() =>
                    this.dataService.mutate<EmitNfe.Mutation, EmitNfe.Variables>(EMIT_NFE, { id: this.id }),
                ),
            )
            .subscribe(
                result => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();

                    if (result.emitNfe.status === 'aprovado') {
                        this.notificationService.success('Nota fiscal emitida.');
                    } else if (result.emitNfe.sefaz) {
                        this.showErrorAlert(result.emitNfe.sefaz);
                    }
                },
                () => {
                    this.notificationService.error('Erro ao emitir a nota fiscal.');
                },
            );
    }

    emitCorrectionLetter(): void {
        // this.nfeOperation(this.dataService.mutate<EmitCorrectionLetter.Mutation, EmitCorrectionLetter.Variables>(
        //     EMIT_CORRECTION_LETTER,
        //     { id: this.id },
        // ), 'emitir a carta de correção');
    }

    cancelNfe(): void {
        //this.nfeOperation(this.dataService.mutate<CancelNfe.Mutation, CancelNfe.Variables>(CANCEL_NFE, { id: this.id }), 'cancelar a nota fiscal');
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const input = NfeFormHelper.prepareFormValuesToUpdate(this.detailForm, this.id);

            console.log(input);

            return this.dataService
                .mutate<UpdateNfe.Mutation, UpdateNfe.Variables>(UPDATE_NFE, { input })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: Nfe): void {
        this.nfeState = entity.state as NfeState;

        try {
            NfeFormHelper.fillFormWithNfe(this.detailForm, entity);
        } catch (errors) {
            console.log(errors);
        }
    }
}
