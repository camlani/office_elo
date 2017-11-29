import { Component } from '@angular/core';

import { Router } from '@angular/router'; 

import { Meteor } from 'meteor/meteor';

@Component({
    selector: 'home-page',
    templateUrl: 'home-page.html',
    styleUrls: ['home-page.scss']
  })
  export class HomePageComponent {

    searchValue:string;

    constructor(
      private router: Router
    ) { }

    goToUserProfile() {
      if (this.searchValue != null){
        this.router.navigate(['/profile', this.searchValue]);
      }
    }
  }