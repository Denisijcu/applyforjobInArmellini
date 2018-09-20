import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yesiandno'
})
export class YesiandnoPipe implements PipeTransform {

    transform(value: any) {
        if (value == null) {  return value = ''; }
        if (value) {
           return  value = '√' ;
        }else {
           return value = '';
        }
    }

}
