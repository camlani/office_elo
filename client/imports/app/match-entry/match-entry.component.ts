import { Component, OnInit } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { matchEntryForm } from './match-entry-form'

import { Meteor } from 'meteor/meteor';

@Component({
    selector: 'match-entry',
    templateUrl: 'match-entry.html',
    styles: ['match-entry.scss']
  })
@InjectUser('user')
  export class MatchEntryComponent implements OnInit{
    tOneOff: string;
    tOneDef: string;
    tTwoOff: string;
    tTwoDef: string;
    tOneRotate: string;
    tTwoRotate: string;
    tOneWin: boolean;
    wScore: number;
    lScore: number;
    user: Meteor.User;

    submitted = false;

    //array for initialization
    result = ['No', 'Yes'];
    winner = ['Team 1', 'Team 2'];

    score =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];

    formData = new matchEntryForm("", "", "", "",this.result[0], this.result[0],"",null,null,this.user);

    ngOnInit(){
        //console.log(this.user);
    }

    onSubmit(){
        //Can be used in showing or hiding some value.
        if(!Meteor.userId()){
            alert('Please log in to add a match');
            return;
        }
        this.submitted = true;
        let formWin = false;
        //Turn win into a boolean
        if(this.formData.tOneWin === "Team 1"){
            formWin = true;
        }

        var objecttoInsert = {
            tOneOff: this.formData.tOneOff,
            tOneDef: this.formData.tOneDef,
            tTwoOff: this.formData.tTwoOff,
            tTwoDef: this.formData.tTwoDef,
            tOneRotate: this.formData.tOneRotate,
            tTwoRotate : this.formData.tTwoRotate,
            mTime: new Date(),
            tOneWin: formWin,
            wScore: this.formData.wScore,
            lScore: this.formData.lScore,
            verif: false,
            userEntry: Meteor.userId()

        } 
        
        //console.log(objecttoInsert);
        Meteor.call('addMatchStats', objecttoInsert);
        this.formData = new matchEntryForm("", "", "", "",this.result[0], this.result[0],"",null,null,this.user);

    } 
    testaddMatchStats(){


    }
  }
