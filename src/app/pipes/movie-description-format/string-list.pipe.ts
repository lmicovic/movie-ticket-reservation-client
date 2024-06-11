import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringList'
})
export class StringListPipe implements PipeTransform {

  transform(value: string[] | number[], ...args: unknown[]): string | string[] {

    let currentValues: string[] = [];
    for (let i = 0; i < value.length; i++) {
      currentValues.push("" + value[i]);
    }

    if(currentValues.length === 0 || currentValues.length === 1) {
      return currentValues;
    } 

    let result: string = "";
    currentValues.forEach((element) => {
      result += element + ", ";
    });

    result = result.substring(0, result.length - 2);

    return result;
  }

}
