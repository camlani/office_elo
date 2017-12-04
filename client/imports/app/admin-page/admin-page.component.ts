import { Component, OnInit } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Roles } from 'meteor/alanning:roles';

import { Meteor } from 'meteor/meteor';

@Component({
    selector: 'admin-page',
    templateUrl: 'admin-page.html',
    styles: ['admin-page.scss']
  })
@InjectUser('user')
  export class AdminPageComponent implements OnInit{
    user: Meteor.User;

    ngOnInit(){
        //console.log(Meteor)
    }

    //Need to have the add new location drop down
    //then add the slider etc.


  }