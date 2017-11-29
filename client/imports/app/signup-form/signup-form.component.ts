import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
    selector: 'signup-form',
    templateUrl: 'signup-form.html',
    styleUrls: ['signup-form.scss']
  })

  @InjectUser('user')
  export class SignupFormComponent implements OnInit {
    user: Meteor.User;
    userName: string;
    email: string;
    password: string;
    ngOnInit() {
      
    }
    /**
     * Submit User Password
     */
    submitSignUpUserPassword() {
      console.log("Userpass " + this.email + " " + this.password )

      var options = {
        username: this.userName,
        email: this.email,
        password: this.password
      }

      Accounts.createUser(options, (error)=> {
        if ( error ) {
          //console.log("Not logged in")
        } else {
          //console.log("Logged in")
          //need to redirect here
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
          //console.log("Not logged in")
        } else {
          //console.log("Logged in")
          //need to redirect here
        }
    });
}

}  