import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';


import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
declare var $: any;

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.html',
    styleUrls: ['login-form.scss']
  })

  @InjectUser('user')
  export class LoginFormComponent implements OnInit {
    user: Meteor.User;
    ngOnInit() {
        //need to move this probably to on change as well
        //so when you click away from it, it will still be able to be reacted with

        //need to add the forms just like a Pintrest or Glass Door
      console.log("modal")
      $("#loginModal").modal()
    }
}  