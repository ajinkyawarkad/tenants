import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search2',
})
export class SearchPipe2 implements PipeTransform {
  
  transform(item: any[], term: string): any[] {
    if(!item) return [];
    if(!term) return item;
    term = term.toLowerCase();
    return item.filter( it => {
      return it.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
            it.manager.toLowerCase().indexOf(term.toLowerCase()) > -1
            
            
    });
  }
}
