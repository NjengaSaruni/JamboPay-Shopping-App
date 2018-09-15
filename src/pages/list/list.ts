import { Component } from '@angular/core';

import {MenuController, NavController, NavParams} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {ShoppingListService} from "../../services/shopping-list.service";
import {ShoppingList} from "../../interfaces/interfaces";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  shoppingLists: ShoppingList[] =  [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public shoppingListService: ShoppingListService, private nav: NavController,
              private menu: MenuController) {
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

  ngAfterViewInit() {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.openPage({component: 'LoginPage'})
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
