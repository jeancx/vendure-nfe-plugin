import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, DataService, NotificationService, ServerConfigService, PermissionsService } from '@vendure/admin-ui/core';
import { omit } from '@vendure/common/lib/omit';
import { Observable, of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import {
    CreateNfeCompany,
    CreateNfeCompanyInput,
    NfeCompany,
    UpdateNfeCompany,
    UpdateNfeCompanyInput,
} from '../../generated-types';

import { CREATE_NFE_COMPANY, UPDATE_NFE_COMPANY } from './nfe-company-detail.graphql';

@Component({
    selector: 'zhf-nfe-company-detail',
    templateUrl: './nfe-company-detail.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class NfeCompanyDetailComponent extends BaseDetailComponent<NfeCompany> implements OnInit {
    detailForm: FormGroup;

    constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
        protected permissionsService: PermissionsService,
    ) {
        super(route, router, serverConfigService, dataService, permissionsService);
        this.detailForm = this.formBuilder.group({
            ownerName: ['', Validators.required],
            cpf: ['', Validators.required],
            unit: ['', Validators.required],
            corporateName: ['', Validators.required],
            tradeName: [''],
            cnpj: ['', Validators.required],
            ie: ['', Validators.required],
            accounting: [''],
            subdomain: [''],
            logoUrl: [''],
            email: [''],
            phone: ['', Validators.required],
            address: this.formBuilder.group({
                postcode: ['', Validators.required],
                street: ['', Validators.required],
                number: ['', Validators.required],
                complement: [''],
                neighborhood: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
            }),
        });
    }

    ngOnInit(): void {
        super.init();
    }

    saveButtonEnabled(): boolean {
        return this.detailForm.dirty && this.detailForm.valid;
    }

    create(): void {
        if (!this.detailForm?.dirty) return;

        const nfeCompany: CreateNfeCompanyInput = this.getFormValues('create');

        this.dataService
            .mutate<CreateNfeCompany.Mutation, CreateNfeCompany.Variables>(CREATE_NFE_COMPANY, { input: nfeCompany })
            .subscribe(
                data => {
                    this.notificationService.success('common.notify-create-success', { entity: 'NfeCompany' });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();

                    this.router.navigate(['../', data.createNfeCompany.id], { relativeTo: this.route });
                },
                () => {
                    this.notificationService.error('common.notify-create-error', { entity: 'NfeCompany' });
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
                    this.notificationService.success('common.notify-update-success', { entity: 'NfeCompany' });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', { entity: 'NfeCompany' });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const input = this.getFormValues('update');
            return this.dataService
                .mutate<UpdateNfeCompany.Mutation, UpdateNfeCompany.Variables>(UPDATE_NFE_COMPANY, { input })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: NfeCompany): void {
        this.detailForm.patchValue(entity);
    }

    private getFormValues(to: 'create' | 'update'): UpdateNfeCompanyInput {
        const formValue = this.detailForm.value;

        return to === 'create' ? omit(formValue, ['id']) : { id: this.id, ...formValue };
    }
}
