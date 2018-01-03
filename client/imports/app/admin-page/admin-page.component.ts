import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Roles } from 'meteor/alanning:roles';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { MatchStats } from '../../../../imports/collections/matchstats';
import { MatchStat } from '../../../../imports/models/matchstat';


@Component({
    selector: 'admin-page',
    templateUrl: 'admin-page.html',
    styles: ['admin-page.scss']
  })
@InjectUser('user')
  export class AdminPageComponent implements OnInit{
    user: Meteor.User;
    matchstats: Observable<MatchStat[]>;
    matchListSubscription: Subscription;
    editMatches = false;
    ngOnInit(){
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
      if(Roles.userIsInRole(Meteor.userId(),['super-admin'])){
        Meteor.call('removeMatchStats', _id);
      }
    }
    clickEditMatches(){
      if(this.editMatches){
        this.editMatches = false;
      } else {
        this.editMatches = true;
      }
    }
    //Need to have the add new location drop down
    //then add the slider etc.


  }