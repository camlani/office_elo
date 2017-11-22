import { Component } from '@angular/core';
import { Meteor } from 'meteor/meteor';

@Component({
    selector: 'match-entry',
    templateUrl: 'match-entry.html',
    styleUrls: ['match-entry.scss']
  })
  export class MatchEntryComponent {
    tOneOff: string;
    tOneDef: string;
    tTwoOff: string;
    tTwoDef: string;
    tOneRotate: boolean;
    tTwoRotate: boolean;
    tOneWin: boolean;
    wScore: int;
    lScore: int;
    addMatchStats() {
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
            verif: false
        }  
        Meteor.call('addMatchStats', objecttoInsert);
        this.content = null;
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
