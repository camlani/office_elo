import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable, Subscription } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';


// To delete after correctly implemented
import { MatchStats } from '../../../../imports/collections/matchstats';
import { MatchStat } from '../../../../imports/models/matchstat';

@Component({
    selector: 'home-page',
    templateUrl: 'home-page.html',
    styleUrls: ['home-page.scss']
  })
  export class HomePageComponent {
    matchstats: Observable<MatchStat[]>;
    matchListSubscription: Subscription;
    matchCountNum: number;

    searchValue:string;

    constructor(
      private router: Router
    ) { }

    ngOnInit() {
      this.matchListSubscription = MeteorObservable.subscribe('matchList').subscribe(() => {
        this.matchstats = MatchStats.find();   

        MatchStats.find().map(matches => matches.length)
        .subscribe(count => this.matchCountNum = count)
      });
    }

    ngOnDestroy() {
      if (this.matchListSubscription) {
        this.matchListSubscription.unsubscribe();
      }
    }

    goToUserProfile() {
      if (this.searchValue != null){
        this.router.navigate(['/profile', this.searchValue]);
      }
    }
  }