import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.rForm = fb.group({
      'password' : [null, Validators.required],
      'username' : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
      'validate' : ''
    });
  }

  login(post) {
    this.username = post.username;
    this.password = post.password;
  }

}
