import { Directive, ElementRef, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: 'input, textarea, select' })
export class FormFieldControlDirective {
    constructor(
        private elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        @Optional() public formControlName: NgControl,
    ) {}

    get valid(): boolean {
        return !!this.formControlName && !!this.formControlName.valid;
    }

    get touched(): boolean {
        return !!this.formControlName && !!this.formControlName.touched;
    }

    setReadOnly(value: boolean): void {
        const input = this.elementRef.nativeElement;

        if (input instanceof HTMLSelectElement && Object.prototype.hasOwnProperty.call(input, 'selectedIndex')) {
            input.disabled = value;
        } else if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            input.readOnly = value;
        }
    }
}
