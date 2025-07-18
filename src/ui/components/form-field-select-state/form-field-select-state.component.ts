import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'zhf-form-field-select-state',
    templateUrl: './form-field-select-state.component.html',
    styleUrls: ['./form-field-select-state.component.scss'],
})
export class FormFieldSelectStateComponent implements OnInit {
    formGroup: FormGroup;
    formControl: FormControl;
    @Input() formControlName: string;
    @Input() placeholder: string;
    @Input() readonly: boolean;
    @Input() label: string;

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit(): void {
        this.formGroup = <FormGroup>this.controlContainer.control;
        this.formControl = <FormControl>this.formGroup.get(this.formControlName);
    }

    states = [
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'PR', label: 'Paraná' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'TO', label: 'Tocantins' },
    ];
}
