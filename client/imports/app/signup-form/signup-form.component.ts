import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
    selector: 'signup-form',
    templateUrl: 'signup-form.html',
    styleUrls: ['signup-form.scss']
  })

  @InjectUser('user')
  export class SignupFormComponent implements OnInit {
    user: Meteor.User;
    ngOnInit() {
      
    }
}  