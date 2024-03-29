import { Component, OnInit } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { matchEntryForm } from './match-entry-form'

import { Meteor } from 'meteor/meteor';

import { MeteorObservable } from 'meteor-rxjs';

@Component({
    selector: 'match-entry',
    templateUrl: 'match-entry.html',
    styleUrls: ['./match-entry.scss']
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
    matchUsers:any;
    

    tOneOffenders: Meteor.User[];
    tOneDefenders: Meteor.User[];
    tTwoOffenders: Meteor.User[];
    tTwoDefenders: Meteor.User[];
    
    submitted = false;

    //array for initialization
    result = ['No', 'Yes'];
    winner = ['', 'Team 1', 'Team 2'];

    score =['',10,9,8,7,6,5,4,3,2,1,0];

    formData = new matchEntryForm("", "", "", "",this.result[0], this.result[0],"",null,null,this.user);

    ngOnInit(){
        //console.log(this.user);
        MeteorObservable.call('allPlayersInMatches').subscribe((response) => {
            // Handle success and response from server!
            this.matchUsers = response;
            //console.log(this.matchUsers);
            
         }, (err) => {
           // Handle error
           console.log(err);
         });
    }

    onSubmit(){
        //Can be used in showing or hiding some value.
        if(!Meteor.userId()){
            alert('Please log in to add a match');
            return;
        }

        console.log(parseInt(this.formData.lScore.toString()) + " " +  parseInt(this.formData.lScore.toString()))
            
        //Temporary form validation
        if(parseInt(this.formData.wScore.toString()) < parseInt(this.formData.lScore.toString())){
            alert('Winning score must be higher than losing score. Please try again.');
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

        window.scrollTo(0, 0);
    } 

    search(searchValue:string, formInputBox:string) {
        if (searchValue && searchValue.length > 1 && searchValue.trim().length) {
          Meteor.subscribe("users");

          switch(formInputBox) { 
            case "tOneOff": { 
                this.tOneOffenders = Meteor.users.find({
                    "$or": [{
                        username: {$regex : searchValue, $options: "i"}
                    }, {
                        displayname: {$regex : searchValue, $options: "i"}
                    }]}
                  ).fetch();
                  if(this.matchUsers){
                    var re = new RegExp(searchValue);
                    //console.log("Good to go");
                    this.matchUsers.forEach(element => {
                      //console.log(element);
                      if(re.test(element)){
                        //console.log("matches regex" + " " + element + " "+ searchValue);
                        var insertObject = {
                          username : element
                        }
                        var contains = false;
                        this.tOneOffenders.forEach(valElement => {
                            if(valElement.username === element){
                                contains = true;
                            }
                        });
                        if(!contains){
                            this.tOneOffenders.push(insertObject)
                        }  
                      } 
                    });
                  }
               break; 
            } 
            case "tOneDef": { 
                this.tOneDefenders = Meteor.users.find({
                    "$or": [{
                        username: {$regex : searchValue, $options: "i"}
                    }, {
                        displayname: {$regex : searchValue, $options: "i"}
                    }]}
                  ).fetch();
                  if(this.matchUsers){
                    var re = new RegExp(searchValue);
                    //console.log("Good to go");
                    this.matchUsers.forEach(element => {
                      //console.log(element);
                      if(re.test(element)){
                        //console.log("matches regex" + " " + element + " "+ searchValue);
                        var insertObject = {
                          username : element
                        }
                        var contains = false;
                        this.tOneDefenders.forEach(valElement => {
                            //console.log(element + " " + valElement)
                            if(valElement.username === element){
                                contains = true;
                            }
                        });
                        if(!contains){
                            this.tOneDefenders.push(insertObject)
                        }  
                      } 
                    });
                  }
               break; 
            } 
            case "tTwoOff": { 
                this.tTwoOffenders = Meteor.users.find({
                    "$or": [{
                        username: {$regex : searchValue, $options: "i"}
                    }, {
                        displayname: {$regex : searchValue, $options: "i"}
                    }]}
                  ).fetch();
                  if(this.matchUsers){
                    var re = new RegExp(searchValue);
                    //console.log("Good to go");
                    this.matchUsers.forEach(element => {
                      //console.log(element);
                      if(re.test(element)){
                        //console.log("matches regex" + " " + element + " "+ searchValue);
                        var insertObject = {
                          username : element
                        }
                        var contains = false;
                        this.tTwoOffenders.forEach(valElement => {
                            if(valElement.username === element){
                                contains = true;
                            }
                        });
                        if(!contains){
                            this.tTwoOffenders.push(insertObject)
                        }  
                      } 
                    });
                  }
                break; 
             } 
             case "tTwoDef": { 
                this.tTwoDefenders = Meteor.users.find({
                    "$or": [{
                        username: {$regex : searchValue, $options: "i"}
                    }, {
                        displayname: {$regex : searchValue, $options: "i"}
                    }]}
                  ).fetch();
                  if(this.matchUsers){
                    var re = new RegExp(searchValue);
                    //console.log("Good to go");
                    this.matchUsers.forEach(element => {
                      //console.log(element);
                      if(re.test(element)){
                        //console.log("matches regex" + " " + element + " "+ searchValue);
                        var insertObject = {
                          username : element
                        }
                        var contains = false;
                        this.tTwoDefenders.forEach(valElement => {
                            if(valElement.username === element){
                                contains = true;
                            }
                        });
                        if(!contains){
                            this.tTwoDefenders.push(insertObject)
                        }  
                      } 
                    });
                  } 
                break; 
             } 
         } 
        } else {
            switch(formInputBox) { 
                case "tOneOff": { 
                    this.tOneOffenders = null;
                   break; 
                } 
                case "tOneDef": { 
                    this.tOneDefenders = null;
                   break; 
                } 
                case "tTwoOff": { 
                    this.tTwoOffenders = null;
                    break; 
                 } 
                 case "tTwoDef": { 
                    this.tTwoDefenders = null;
                    break; 
                 } 
            }
        }
      }

    setSearchValue(formInputBox:string){
        switch(formInputBox) { 
            case "tOneOff": { 
                if (this.tOneOffenders.length > 0) {
                    this.formData.tOneOff = this.tOneOffenders[0].username;
                }
                this.tOneOffenders = null;
               break; 
            } 
            case "tOneDef": { 
                if (this.tOneDefenders.length > 0) {
                    this.formData.tOneDef = this.tOneDefenders[0].username;
                }
                this.tOneDefenders = null;
               break; 
            } 
            case "tTwoOff": { 
                if (this.tTwoOffenders.length > 0) {
                    this.formData.tTwoOff = this.tTwoOffenders[0].username;
                }
                this.tTwoOffenders = null;
                break; 
             } 
             case "tTwoDef": { 
                if (this.tTwoDefenders.length > 0) {
                    this.formData.tTwoDef = this.tTwoDefenders[0].username;
                }
                this.tTwoDefenders = null;
                break; 
             } 
        }
    }
    testaddMatchStats(){


    }
  }
