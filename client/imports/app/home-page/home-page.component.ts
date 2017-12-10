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

    goToUserProfile() {
      if (this.searchValue != null){
        this.router.navigate(['/profile', this.searchValue]);
      }
    }
  }