import { Component, ContentChild, Input, OnInit } from '@angular/core';

import { FormFieldControlDirective } from '../../common';

/**
 * A compact custom form field wrapper which handles the correct layout
 * and validation error display for a form control.
 */
@Component({
    selector: 'zhf-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
    @Input() label: string;
    @Input() for: string;
    @Input() tooltip: string;
    @Input() required = false;
    @Input() select = false;
    @Input() errors: { [key: string]: string } = {};

    /**
     * If set to true, the input will be initially set to "readOnly", and an "edit" button
     * will be displayed which allows the field to be edited.
     */
    @Input() readOnlyToggle = false;
    @ContentChild(FormFieldControlDirective, { static: true }) formFieldControl: FormFieldControlDirective;
    isReadOnly = false;

    ngOnInit(): void {
        if (this.readOnlyToggle) {
            this.isReadOnly = true;
            this.setReadOnly(true);
        }

        this.isReadOnly = this.readOnlyToggle;
    }

    setReadOnly(value: boolean): void {
        this.formFieldControl.setReadOnly(value);
        this.isReadOnly = value;
    }

    getErrorMessage(): string | undefined {
        if (!this.formFieldControl || !this.formFieldControl.formControlName) return;

        const errors = this.formFieldControl.formControlName.errors;
        if (errors) {
            for (const errorKey of Object.keys(errors)) {
                if (this.errors[errorKey]) {
                    return this.errors[errorKey];
                }
            }
        }
    }
}
