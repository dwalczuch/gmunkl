import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sort',
})

export class KeysPipe implements PipeTransform {    //Sortiert Array von Objekten nach Attribut "stadt"
  transform(array: Array<any>): Array<string> {     //benutzt bei Anzeige von Organisationen
    array.sort((a: any, b: any) => {
      if (a.stadt < b.stadt) {
        return -1;
      } else if (a.stadt > b.stadt) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
