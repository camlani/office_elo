import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable, Subscription } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { LocationService } from '../location-selection/location-selection.service';


import { TableCounts } from '../../../../imports/collections/tableCounts';

@Component({
    selector: 'home-page',
    templateUrl: 'home-page.html',
    styleUrls: ['home-page.scss']
  })
  export class HomePageComponent {
    countsSubscription: Subscription;
    matchSubscription: Subscription;
    userSubscription: Subscription;
    matchUsersSubscription: Subscription;
    matchCountNum: number;
    totalPlayersNum: number;

    searchValue:string;
    searchSubscription: Subscription;
    users: Meteor.User[];
    matchUsers:any;

    constructor(
      private router: Router,
      private locationService: LocationService    
    ) { }

    ngOnInit() {
      this.countsSubscription = MeteorObservable.subscribe('tableCounts').subscribe(() => {
        this.matchSubscription = TableCounts.find({tableName:'MatchStats'}).subscribe(x => this.matchCountNum = x[0].entryCount);
        this.userSubscription = TableCounts.find({tableName:'users'}).subscribe(x => this.totalPlayersNum = x[0].entryCount);  
      });
      //MeteorObservable.call('allPlayersInMatches')
      MeteorObservable.call('allPlayersInMatches').subscribe((response) => {
        // Handle success and response from server!
        this.matchUsers = response;
        //console.log(this.matchUsers);
        
     }, (err) => {
       // Handle error
       console.log(err);
     });
      // Meteor.call('allPlayersInMatches',{}, (data)=>{
      //   if(data){
      //     console.log(data);
      //     this.matchUsers = data;
      //   }
      // });
    }

    ngOnDestroy() {
      if (this.countsSubscription) {
        this.countsSubscription.unsubscribe();
      }
      if (this.matchSubscription) {
        this.matchSubscription.unsubscribe();
      }
      if (this.userSubscription) {
        this.userSubscription.unsubscribe();
      }
    }

    navigateToProfile(username) {
      if (this.searchValue && this.searchValue.trim().length){
        this.router.navigate(['/profile', username]);
      }
    }
    navigateToProfileWithSearchValue() {
      if (this.users && this.users.length > 0){
        this.router.navigate(['/profile', this.users[0].username]);
      }
    }
    
    search() {
      //console.log("We are in search")
      if (this.searchValue && this.searchValue.length > 1 && this.searchValue.trim().length) {
        Meteor.subscribe("users");
        this.users = Meteor.users.find({
          "$or": [{
              username: {$regex : this.searchValue, $options: "i"}
          }, {
              displayname: {$regex : this.searchValue, $options: "i"}
          }]}
        ).fetch();

        //console.log(this.matchUsers)
        if(this.matchUsers){
          var re = new RegExp(this.searchValue);
          //console.log("Good to go");
          this.matchUsers.forEach(element => {
            //console.log(element);
            if(re.test(element)){
              console.log("matches regex" + " " + element + " "+ this.searchValue);
              var insertObject = {
                username : element
              }
              this.users.push(insertObject)
            }
          });
        }


      } else {
        this.users = null;
      }
    }
  }