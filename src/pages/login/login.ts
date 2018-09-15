import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ListPage} from "../list/list";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  username:string = '';
  password:string = '';
  logginError: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private fb: FormBuilder, private shoppingListService: ShoppingListService) {
    this.rForm = fb.group({
      'password' : [null, Validators.required],
      'username' : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
      'validate' : ''
    });
  }

  login(post) {
    let loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    this.shoppingListService.authenticate(post.username, post.password)
      .subscribe(
        token => {
          if(loading !== null){
            loading.dismiss();
          }
          localStorage.setItem('token', token.token);
          this.navCtrl.push(ListPage,{

          });
        },
        error => {
          this.logginError = true;
          setTimeout(() => {
            this.logginError = false;
          }, 4000);
          if(loading !== null){
            loading.dismiss();
          }
          console.log(error);
        }
      )
  }
}
