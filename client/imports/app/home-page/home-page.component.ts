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
    tableCountSubscription: Subscription;
    matchCountNum: number;

    searchValue:string;

    constructor(
      private router: Router
    ) { }

    ngOnInit() {
      this.tableCountSubscription = MeteorObservable.subscribe('tableCounts').subscribe(() => {
        TableCounts.find({tableName:'MatchStats'}).subscribe(x => this.matchCountNum = x[0].entryCount)   
      });
    }

    ngOnDestroy() {
      if (this.tableCountSubscription) {
        this.tableCountSubscription.unsubscribe();
      }
    }

    goToUserProfile() {
      if (this.searchValue != null){
        this.router.navigate(['/profile', this.searchValue]);
      }
    }
  }