import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';


import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { LocationService } from '../location-selection/location-selection.service';

import { TableLocations } from '../../../../imports/collections/locations';
import { Table, TableLocation } from '../../../../imports/models/locations';

@Component({
    selector: 'table-status',
    templateUrl: 'table-status.html',
    styleUrls: ['table-status.scss']
  })
@InjectUser('user')
export class TableStatusComponent implements OnInit {
    user: Meteor.User;
    locationTables: Observable<TableLocation[]>;
    locationTablesSubscription: Subscription;

    constructor(private locationService: LocationService){
        
    }
    //need an observable or some sort of event emitter, to then rerun the 
    //what needs to happen is that child stuff once again and pass in the values from the ngfor
    ngOnInit(){
        this.locationTablesSubscription = MeteorObservable.subscribe('tableLocations').subscribe(() => {
            this.locationTables = TableLocations.find({_id: this.locationService.getLocationId()});
            console.log(this.locationService.getLocationId())
        });
    }
    ngOnDestroy(){
        if (this.locationTablesSubscription) {
          this.locationTablesSubscription.unsubscribe();
        }
    }
    
}