import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';


import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.html',
    styleUrls: ['nav-bar.scss']
  })
  @InjectUser('user')
  export class NavBarComponent implements OnInit {
    user: Meteor.User;
    ngOnInit() {
      console.log(this.user)
    }

    logout() {
      Meteor.logout();
    }
    // Do not need these anymore since going to redirect
    // login(){
    //   console.log("Log in")
    // }
    // signup(){
    //   console.log("Sign Up")
    // }
}  