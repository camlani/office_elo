import { Component, OnInit } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Meteor } from 'meteor/meteor';

@Component({
    selector: 'match-entry',
    templateUrl: 'match-entry.html'
  })
@InjectUser('user')
  export class MatchEntryComponent implements OnInit{
    tOneOff: string;
    tOneDef: string;
    tTwoOff: string;
    tTwoDef: string;
    tOneRotate: boolean;
    tTwoRotate: boolean;
    tOneWin: boolean;
    wScore: number;
    lScore: number;
    user: Meteor.User;

    ngOnInit(){
        console.log(this.user);
    }
    addMatchStats() {
        if(!Meteor.userId()){
            alert('Please log in to add a match');
            return;
        }
        var objecttoInsert = {
            tOneOff: this.tOneOff,
            tOneDef: this.tOneDef,
            tTwoOff: this.tTwoOff,
            tTwoDef: this.tTwoDef,
            tOneRotate: this.tOneRotate,
            tTwoRotate : this.tTwoRotate,
            mTime: new Date(),
            tOneWin: this.tOneWin,
            wScore: this.wScore,
            lScore: this.lScore,
            verif: false,
            userEntry: Meteor.userId()

        }  
        Meteor.call('addMatchStats', objecttoInsert);
        this.tOneOff = null;
        this.tOneDef = null;
        this.tTwoOff = null;
        this.tTwoDef = null;
        this.tOneRotate = null;
        this.tTwoRotate = null;
        this.tOneWin = null;
        this.wScore = null;
        this.lScore = null;
    }
  }
