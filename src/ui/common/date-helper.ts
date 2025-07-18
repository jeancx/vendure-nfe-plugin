import { DatePipe } from '@angular/common';

export class DateHelper {
    private static datepipe = new DatePipe('pt-BR');

    static format(date: string | number | Date = new Date(), format: string): string {
        return this.datepipe.transform(date, format) || '';
    }

    static today(): Date {
        return new Date();
    }

    static addDays(days: number, date: Date = new Date()): Date {
        date.setDate(date.getDate() + days);

        return date;
    }

    static year(date: Date = new Date()): number {
        return date.getFullYear();
    }

    static yearRange(begin: number = this.year(), end: number = this.year()): [number, number] {
        return [begin, end];
    }
}
