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
    winLossRatio = 0;
    winPercentage = 0;
    totalGamesPlayed = 0;
    offenseGames = 0;
    defenseGames = 0;
    offenseWins = 0;
    defenseWins = 0;
    offensiveWinPercentage = 0;
    defensiveWinPercentage = 0;
    buddy:string;
    nemesis:string;
    mostFrequentPartner:string;
    statsLoaded = false;

    matchstats: MatchStat[];
    matchListSubscription: Subscription;

    private sub: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.username = params['username'];
         
        this.matchListSubscription = MeteorObservable.subscribe('profile', this.username).subscribe(() => {
          this.matchstats = MatchStats.find({},{sort:{mTime:-1}}).fetch();
          this.wins = this.numberOfWins(this.matchstats);
          this.losses = this.numberOfLosses(this.matchstats);
          this.winLossRatio = +(this.wins / this.losses).toFixed(2);
          this.offenseWins = this.numberOfWinsOffense(this.matchstats);
          this.winPercentage = +((this.wins / (this.losses + this.wins))*100).toFixed(2);
          this.offensiveWinPercentage = +((this.offenseWins / (this.offenseGames))*100).toFixed(2);
          this.defensiveWinPercentage = +((this.defenseWins / (this.defenseGames))*100).toFixed(2);
          this.totalGamesPlayed = this.matchstats.length;

          MeteorObservable.call("getUsersBuddy", this.username).subscribe((response) => {
            this.buddy = String(response);
          }, (err) => {
            console.log(err);
          });

          MeteorObservable.call("getUsersNemesis", this.username).subscribe((response) => {
            this.nemesis = String(response);
          }, (err) => {
            console.log(err);
          });

          MeteorObservable.call("getMostFrequentPartner", this.username).subscribe((response) => {
            this.mostFrequentPartner = String(response);
          }, (err) => {
            console.log(err);
          });
         

          this.statsLoaded = true;
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

        // console.log(this.profile);
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

    didUserPlayOffense(match:MatchStat){
      if ((match.tOneOff===this.username || match.tTwoOff===this.username)){
        return true;
      } else {
        return false
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

    

    numberOfWinsOffense(matches:MatchStat[]) {
      var wins = 0;
      var timesPlayedOffense = 0;
      var defWins = 0;
      var timesPlayedDefense = 0;
      matches.forEach((match)=>{
        if (this.didUserPlayOffense(match)){
          if(this.didUserWin(match)){
            wins++;
          }
          timesPlayedOffense++;
        } else {
          if(this.didUserWin(match)){
            defWins++;
          }
          timesPlayedDefense++;
        }
      });
      this.offenseWins = wins;
      this.offenseGames = timesPlayedOffense;
      this.defenseWins = defWins;
      this.defenseGames = timesPlayedDefense;
      return wins;
    }


    ngOnDestroy() {
      if (this.matchListSubscription) {
        this.matchListSubscription.unsubscribe();
      }
    }
  }