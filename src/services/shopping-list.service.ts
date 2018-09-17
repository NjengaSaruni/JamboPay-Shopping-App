import {Observable} from "rxjs";
import {Item, ItemsEntity, ShoppingList, Token} from "../interfaces/interfaces";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ShoppingListService {
  baseUrl = 'http://35.241.145.65:8000/';


  constructor(public http: HttpClient){
  }

  getShoppingList(): Observable<ShoppingList[]>{
    const url = `${this.baseUrl}shopping-lists/`;
    return this.http.get<ShoppingList[]>(url, this.getHeaders());
  }

  createShoppingList(name: string, budget: number, limit: string): Observable<ShoppingList> {
    const url = `${this.baseUrl}shopping-lists/`;
    return this.http.post<ShoppingList>(
      url,
      {
        name: name,
        budget: budget,
        limit: limit
      },
      this.getHeaders());
  }

  patchItem(bought: boolean, id: string): Observable<ItemsEntity>{
    const url = `${this.baseUrl}shopping-lists/items/${id}/`;

    return this.http.patch<ItemsEntity>(url, {bought: bought},this.getHeaders());
  }

  getAllItems(): Observable<Item[]> {
    const url = `${this.baseUrl}catalogue/`;

    return this.http.get<Item[]>(url, this.getHeaders());
  }

  createNewItem(name: string, price: number): Observable<Item> {
    const url = `${this.baseUrl}catalogue/`;

    return this.http.post<Item>(
      url,
      {
        name: name,
        price: price
      },
      this.getHeaders()
    )
  }

  createNewShoppingItem(itemId: string, listId: string): Observable<ItemsEntity>{
    const url = `${this.baseUrl}shopping-lists/items/`;

    return this.http.post<ItemsEntity>(url, {
      item: itemId,
      list: listId
    }, this.getHeaders());

  }

  authenticate(username: string, password: string): Observable<Token>{
    const url = `${this.baseUrl}api-token-auth/`;

    return this.http.post<Token>(url, {
      username: username,
      password: password
    });
  }

  getHeaders(){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `JWT ${token}`
      })
    };

    return httpOptions;
  }
}


