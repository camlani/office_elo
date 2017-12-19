import { Injectable } from '@angular/core';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';


import { TableLocations } from '../../../../imports/collections/locations';
import { Table, TableLocation } from '../../../../imports/models/locations';

@Injectable()
export class LocationService {
    selectedLocation_id: string = "";
    selectedLocationName: string = "";

    private selectedLocation_id_source = new BehaviorSubject<string>("");
    private selectLocationName_source = new BehaviorSubject<string>("");

    currentLocation_id = this.selectedLocation_id_source.asObservable();
    currentLocationName = this.selectLocationName_source.asObservable();

    //set the user location whenever a user logs in
    //even provide a home location
    //load up
    constructor() {}


    setLocationId(id : string){
        this.selectedLocation_id = id;
        this.selectedLocation_id_source.next(id);
    }

    getLocationId(): string{
        return this.selectedLocation_id;
    }

    setLocationName(name : string){
        this.selectedLocationName = name;
        this.selectLocationName_source.next(name);
    }
    getLocationName(): string{
        return this.selectedLocationName;
    }
    
}