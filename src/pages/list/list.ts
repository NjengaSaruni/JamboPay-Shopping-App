
import { Component } from '@angular/core';

import {LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {ShoppingListService} from "../../services/shopping-list.service";
import {ItemsEntity, ShoppingList} from "../../interfaces/interfaces";
import {ListFormPage} from "../list-form/list-form";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  shoppingLists: ShoppingList[] =  [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public shoppingListService: ShoppingListService, private nav: NavController,
              private menu: MenuController, private loadingCtrl: LoadingController) {
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

  openListForm(){
    this.navCtrl.push(ListFormPage);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(page.component);
  }

  updateBought(list: ShoppingList, item: ItemsEntity){
    this.patchBudget(item, list);
  }

  patchBudget(item: ItemsEntity, list: ShoppingList) {
    let loading = this.loadingCtrl.create({
      content: 'Updating shopping list...'
    });
    loading.present();
    this.shoppingListService.patchItem(item)
      .subscribe(item => {
          console.log(item);
          loading.dismiss();
          let total = 0;
          for(let item of list.items){
            if(item.bought){
              total += item.price;
            }
          }
          list.total_bought = total;
          this.getShoppingLists();
        },
        error => {
          console.log(error);
          loading.dismiss();
        }
      )};
}
