
import { Component } from '@angular/core';

import {LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {ShoppingListService} from "../../services/shopping-list.service";
import {Item, ItemsEntity, ShoppingList} from "../../interfaces/interfaces";
import {ListFormPage} from "../list-form/list-form"
import * as _ from "lodash";
import {ItemFormPage} from "../item-form/item-form";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  shoppingLists: ShoppingList[] =  [];
  items: Item[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public shoppingListService: ShoppingListService, private nav: NavController,
              private menu: MenuController, private loadingCtrl: LoadingController) {
    this.getShoppingLists();
    this.getAllItems();
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
          this.shoppingLists = _.reverse(list);
        },
        error => console.log(error)
      )
  }

  getAllItems() {
    this.shoppingListService.getAllItems()
      .subscribe(
        items => this.items = items,
        error => console.log(error)
      );
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

  addItem(list){
    this.navCtrl.push(ItemFormPage, {list: list});
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
    this.shoppingListService.patchItem(item.bought, item.id)
      .subscribe(item => {
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
