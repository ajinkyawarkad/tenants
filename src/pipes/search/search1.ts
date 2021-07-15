import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search1',
})
export class SearchPipe1 implements PipeTransform {
  
  transform(item: any[], term: string): any[] {
    if(!item) return [];
    if(!term) return item;
    term = term.toLowerCase();
    return item.filter( it => {
      return it.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
             it.role.toLowerCase().indexOf(term.toLowerCase()) > -1  ||
             it.email.toLowerCase().indexOf(term.toLowerCase()) > -1
            
            
    });
  }
}
