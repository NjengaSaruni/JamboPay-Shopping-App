import {Observable} from "rxjs";
import {ShoppingList} from "../interfaces/interfaces";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ShoppingListService {

  constructor(public http: HttpClient){
  }

  getShoppingList(): Observable<ShoppingList[]>{
    const url = 'http://127.0.0.1:8000/shopping-lists/';
// if(this.authProvider.getToken()){
//   return this.http.get<IPromotionDetail>(url, this.apiconnect.getHeaders())
// }
// else {
    return this.http.get<ShoppingList[]>(url);
// }
  }
}


