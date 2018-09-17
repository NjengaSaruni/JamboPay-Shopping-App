import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ListPage} from "../list/list";
import {ShoppingList} from "../../interfaces/interfaces";

/**
 * Generated class for the ItemFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-form',
  templateUrl: 'item-form.html',
})
export class ItemFormPage {
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  name:string = '';
  budget:number = 0;
  formError: boolean;
  list: ShoppingList;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder, private loadingCtrl: LoadingController,
              private shoppingListService: ShoppingListService) {
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'price' : [null, Validators.required],
    });

    this.list = this.navParams.get('list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemFormPage');
  }


  addItem(item) {
    let loading = this.loadingCtrl.create({
      content: 'Creating your item...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    this.shoppingListService.createNewItem(item.name, item.price)
      .subscribe(
        item => {
          this.shoppingListService.createNewShoppingItem(
            item.id,
            this.list.id
          ).subscribe(
            list => {
              this.navCtrl.setRoot(ListPage);
              if(loading !== null){
                loading.dismiss();
              }
            }
          );
          this.navCtrl.setRoot(ListPage,{

          });
        },
        error => {
          this.formError = true;
          setTimeout(() => {
            this.formError = false;
          }, 4000);
          if(loading !== null){
            loading.dismiss();
          }
          console.log(error);
        }
      )
  }

}
