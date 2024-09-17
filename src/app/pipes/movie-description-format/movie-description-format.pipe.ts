import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieDescriptionFormat'
})
export class MovieDescriptionFormatPipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {

    value = value.split(" ").slice(0,limit).join(" ") + "...";

    if(value.split(" ").length < limit) {
      value = value.slice(0, -3);
    }

    return value;    
  }

}
