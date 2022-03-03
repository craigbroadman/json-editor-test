import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Item {
  name: string;
  price: number;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any>('assets/items.json')
      .toPromise()
      .then(res => <Item[]>res.data)
      .then(data => { return data; });
  }
}
