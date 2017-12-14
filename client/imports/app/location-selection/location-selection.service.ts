import { Injectable } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';


import { TableLocations } from '../../../../imports/collections/locations';
import { Table, TableLocation } from '../../../../imports/models/locations';

@Injectable()
export class LocationService {
    selectedLocation_id: String = "";
    selectedLocationName: String = "";
    //set the user location whenever a user logs in
    //even provide a home location
    //load up

    setLocationId(id : String){
        this.selectedLocation_id = id;
    }

    getLocationId(): String{
        return this.selectedLocation_id;
    }

    setLocationName(name : String){
        this.selectedLocationName = name;
    }
    getLocationName(): String{
        return this.selectedLocationName;
    }
    
}