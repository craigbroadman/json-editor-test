import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Item, ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public items: Item[] = [];
  public tableColumns: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'author', header: 'Author' },
    { field: 'price', header: 'Price' },
  ];

  constructor(
    private config: PrimeNGConfig,
    private itemService: ItemService) { }

  ngOnInit() {

    this.config.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER
      ]
    }

    this.itemService.getItems().then(items => this.items = items);
  }

  applyFilterGlobal(table: Table, $event: any, value: string) {
    table.filterGlobal(($event.target as HTMLInputElement).value, value);
  }

  clear(table: Table) {
    table.clear();
}
}
