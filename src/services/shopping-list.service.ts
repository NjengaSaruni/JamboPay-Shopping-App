import {Observable} from "rxjs";
import {ShoppingList, Token} from "../interfaces/interfaces";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ShoppingListService {
  baseUrl = 'http://127.0.0.1:8000/';


  constructor(public http: HttpClient){
  }

  getShoppingList(): Observable<ShoppingList[]>{
    const url = `${this.baseUrl}shopping-lists/`;
    return this.http.get<ShoppingList[]>(url, this.getHeaders());
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


