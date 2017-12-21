import { Component } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { ActivatedRoute } from '@angular/router';
import { MatchStats } from '../../../../imports/collections/matchstats';
import { MatchStat } from '../../../../imports/models/matchstat';
import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
    selector: 'profile',
    templateUrl: 'profile.html',
    styleUrls: ['profile.scss']
  })
  export class ProfileComponent {
    username: string;
    email: string;
    displayName: string;
    profile: any;
    wins = 0;
    losses = 0;
    totalGamesPlayed = 0;
    statsLoaded = false;

    matchstats: Observable<MatchStat[]>;
    matchListSubscription: Subscription;

    private sub: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.username = params['username'];
         
        this.matchListSubscription = MeteorObservable.subscribe('profile', this.username).subscribe(() => {
          this.matchstats = MatchStats.find();
          this.matchstats.subscribe((matches) => {
            this.statsLoaded = true;
          });          
          
          console.log(this.matchstats.last);  
        });


         Meteor.subscribe("users");
         this.profile = Meteor.users.find({ username: this.username }).fetch()[0];
         if (this.profile){
          this.email = this.profile.emails[0].address;
          this.displayName = this.profile.displayname !== "" ? this.profile.displayname : "N/A" ;
         } else {
          this.email = "Loading...";
          this.displayName = "Loading...";
         }

        console.log(this.profile);
         // In a real app: dispatch action to load the details here.
         
      });
    }

    didUserWin(match:MatchStat) {
      if ((match.tOneOff===this.username || match.tOneDef===this.username)&&(match.tOneWin)){
        return true;
      } else if ((match.tTwoOff===this.username || match.tTwoDef===this.username)&&(!match.tOneWin)){
        return true;
      } else {
        return false;
      }
    }

    numberOfWins(matches:MatchStat[]) {
      var wins = 0;
      matches.forEach((match)=>{
        if (this.didUserWin(match)){
          wins++;
        }
      });
      this.wins = wins;
      return wins;
    }

    numberOfLosses(matches:MatchStat[]) {
      var losses = 0;
      matches.forEach((match)=>{
        if (!this.didUserWin(match)){
          losses++;
        }
      });
      this.losses = losses;
      return losses;
    }

    calculateRatio(){
      return this.wins / this.losses;
    }

    ngOnDestroy() {
      if (this.matchListSubscription) {
        this.matchListSubscription.unsubscribe();
      }
    }
  }