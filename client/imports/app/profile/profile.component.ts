import { Component } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
  })
  export class ProfileComponent {
    username: string;
    private sub: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
         this.username = params['username'];
  
         // In a real app: dispatch action to load the details here.
      });
    }
  }