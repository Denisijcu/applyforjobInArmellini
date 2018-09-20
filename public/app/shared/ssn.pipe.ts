import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fssn'
})
export class SSNPipe implements PipeTransform {
    transform(value: any) {
        if (value == null) { return; }
        value = value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5, 4);
        return value;
    }

}
