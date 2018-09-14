import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {ShoppingListService} from "../../services/shopping-list.service";
import {ShoppingList} from "../../interfaces/interfaces";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  shoppingLists: ShoppingList[] =  [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListService: ShoppingListService) {
    this.getShoppingLists();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getShoppingLists(){
    this.shoppingListService.getShoppingList()
      .subscribe(
        list => {
          console.log(list);
          this.shoppingLists = list;
        },
        error => console.log(error)
      )
  }
}
