import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      return (
        fullName.includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.department.toLowerCase().includes(searchText) ||
        item.position.toLowerCase().includes(searchText)
      );
    });
  }
}
