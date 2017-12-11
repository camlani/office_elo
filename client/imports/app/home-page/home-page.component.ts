import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable, Subscription } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { TableCounts } from '../../../../imports/collections/tableCounts';

@Component({
    selector: 'home-page',
    templateUrl: 'home-page.html',
    styleUrls: ['home-page.scss']
  })
  export class HomePageComponent {
    countsSubscription: Subscription;
    matchSubscription: Subscription;
    userSubscription: Subscription;
    matchCountNum: number;
    totalPlayersNum: number;

    searchValue:string;
    searchSubscription: Subscription;
    users: Meteor.User[];

    constructor(
      private router: Router
    ) { }

    ngOnInit() {
      this.countsSubscription = MeteorObservable.subscribe('tableCounts').subscribe(() => {
        this.matchSubscription = TableCounts.find({tableName:'MatchStats'}).subscribe(x => this.matchCountNum = x[0].entryCount);
        this.userSubscription = TableCounts.find({tableName:'users'}).subscribe(x => this.totalPlayersNum = x[0].entryCount);  
      });
    }

    ngOnDestroy() {
      if (this.countsSubscription) {
        this.countsSubscription.unsubscribe();
      }
      if (this.matchSubscription) {
        this.matchSubscription.unsubscribe();
      }
      if (this.userSubscription) {
        this.userSubscription.unsubscribe();
      }
    }

    navigateToProfile(username) {
      if (this.searchValue && this.searchValue.trim().length){
        this.router.navigate(['/profile', username]);
      }
    }
    navigateToProfileWithSearchValue() {
      if (this.users){
        this.router.navigate(['/profile', this.users[0].username]);
      }
    }
    
    search() {
      if (this.searchValue && this.searchValue.length > 2 && this.searchValue.trim().length) {
        Meteor.subscribe("users");
        this.users = Meteor.users.find({
          "$or": [{
              username: {$regex : this.searchValue}
          }, {
              displayname: {$regex : this.searchValue}
          }]}
        ).fetch();
      } else {
        this.users = null;
      }
    }
  }