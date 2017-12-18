import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';


import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { LocationService } from '../location-selection/location-selection.service';

import { TableLocations } from '../../../../imports/collections/locations';
import { Table, TableLocation } from '../../../../imports/models/locations';


@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.html',
    styleUrls: ['nav-bar.scss']
  })
  @InjectUser('user')
  export class NavBarComponent implements OnInit {
    user: Meteor.User;
    locationTables: Observable<TableLocation[]>;
    locationTablesSubscription: Subscription;
    locationNameSelected : String

    constructor(private locationService: LocationService){

    }
    ngOnInit() {
      this.locationTablesSubscription = MeteorObservable.subscribe('tableLocations').subscribe(() => {
        this.locationTables = TableLocations.find();
        //need to find the users prefered location too.
      });
    }
    ngOnDestroy(){
      if (this.locationTablesSubscription) {
        this.locationTablesSubscription.unsubscribe();
      }
    }
    logout() {
      Meteor.logout();
    }
    selectLocation(id, name){
      //console.log("location Selected" + " " + id + " " + name)
      this.locationService.setLocationId(id);
      this.locationService.setLocationName(name);
      this.locationNameSelected = this.locationService.getLocationName();
      //console.log(this.locationNameSelected);
    }

    closeNav () {
      $(".navbar-toggle").click();
    }
}  