import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fphone'
})
export class PhonePipe implements PipeTransform {

    transform(value: any) {
        if (value == null) { return; }
        value = '(' + value.substr(0, 3) + ') ' + value.substr(3, 3) + '-' + value.substr(6, 4);
        return value;
    }

}
