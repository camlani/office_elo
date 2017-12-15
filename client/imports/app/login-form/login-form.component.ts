import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Router } from '@angular/router'; 


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
    email: string;
    password: string;

    constructor(
      private router: Router   
    ) {}

    ngOnInit() {
        //need to move this probably to on change as well
        //so when you click away from it, it will still be able to be reacted with

        //need to add the forms just like a Pintrest or Glass Door
      console.log("login-page")   
    }
    submitUserPassword() {
        console.log("Userpass " + this.email + " " + this.password )
        Meteor.loginWithPassword(this.email, this.password, ( error ) => {
            if ( error ) {
              console.log("Not logged in")
            } else {
              console.log("Logged in")
              this.router.navigate(['']);
              }
        });
    }
    loginWithGoogle(){
        console.log("Google Pass");
        var options = {
            requestPermissions: [ 'email' ]
          };
        Meteor.loginWithGoogle(options, ( error ) => {
            if ( error ) {
              console.log("Not logged in")
            } else {
              console.log("Logged in")
              this.router.navigate(['']);
            }
        });
    }
}  