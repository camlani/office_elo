import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription  } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';


import { Meteor } from 'meteor/meteor';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';

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
    locationTable: ObservableCursor<TableLocation>;
    locationTablesSubscription: Subscription;
    
    locationId: string;
    
    constructor(private locationService: LocationService){
        
    }
        ngOnInit(){
        this.locationService.currentLocation_id.subscribe(locationId => this.locationTablesSubscription = MeteorObservable.subscribe('tableLocations').subscribe(() => {
            //this.locationTables = TableLocations.find({_id: this.locationService.getLocationId()});
            //this value is not loaded quick enough
            this.locationTables = TableLocations.find({"_id": locationId});
            //this.locationTable = TableLocations.findOne({"_id": locationId});
        }));
        console.log(this.locationTable);
        
    }
    ngOnDestroy(){
        if (this.locationTablesSubscription) {
          this.locationTablesSubscription.unsubscribe();
        }
    }
    //event from event emitter
    toggleStatusEvent(tableToEdit){

    }
    
}