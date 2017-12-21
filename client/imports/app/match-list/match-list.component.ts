import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { MatchStats } from '../../../../imports/collections/matchstats';
import { MatchStat } from '../../../../imports/models/matchstat';

@Component({
    selector: 'match-list',
    templateUrl: 'match-list.html',
    styleUrls: ['match-list.scss']
  })
  export class MatchListComponent implements OnInit, OnDestroy {
    matchstats: Observable<MatchStat[]>;
    matchListSubscription: Subscription;
    ngOnInit() {
      this.matchListSubscription = MeteorObservable.subscribe('matchList').subscribe(() => {
        this.matchstats = MatchStats.find({},{sort:{mTime:-1}});
      });
    }
    ngOnDestroy() {
      if (this.matchListSubscription) {
        this.matchListSubscription.unsubscribe();
      }
    }
    removeMatchStat(_id: string) {
      Meteor.call('removeMatchStats', _id);
    }
  }