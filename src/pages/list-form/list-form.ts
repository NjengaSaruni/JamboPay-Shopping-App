import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListPage} from "../list/list";
import {ShoppingListService} from "../../services/shopping-list.service";

/**
 * Generated class for the ListFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-form',
  templateUrl: 'list-form.html',
})
export class ListFormPage {
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  name:string = '';
  budget:number = 0;
  formError: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder, private loadingCtrl: LoadingController,
              private shoppingListService: ShoppingListService) {
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'budget' : [null, Validators.required],
      'validate' : ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListFormPage');
  }

  createList(post) {
    let loading = this.loadingCtrl.create({
      content: 'Creating your list...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    this.shoppingListService.createShoppingList(post.name, post.budget)
      .subscribe(
        list => {
          if(loading !== null){
            loading.dismiss();
          }

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
