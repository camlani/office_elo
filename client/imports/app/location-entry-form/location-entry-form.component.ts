import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { TableForm, TableLocationForm } from './location-entry-form';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { TableLocations } from '../../../../imports/collections/locations';
import { Table, TableLocation } from '../../../../imports/models/locations';




@Component({
    selector: 'location-entry',
    templateUrl: 'location-entry.html',
    styleUrls: ['location-entry.scss']
})
@InjectUser('user')
   export class LocationEntryComponent implements OnInit, OnDestroy {

        submitted = false;

        createLocation = false;
        editLocation = false;


        status = [true, false];
        sports = ["Foosball", "Table Tennis", "Corn Hole"];

        // formTable = new TableForm("", "Cafe Table", new Date(), false, this.sports[0])
        // formTable2 = new TableForm("", "Cafe Table 2", new Date(), true, this.sports[1])
        // tableArray = [this.formTable, this.formTable2] 
        // tableArray2 = [this.formTable2, this.formTable] 
        // formLocation = new TableLocationForm("","CS RTP",new Date(),this.tableArray);
        // location2 = new TableLocationForm("","CS RPP",new Date(),this.tableArray2);
        // locations = [this.formLocation, this.location2];

        //activeLocation = this.locations[0];

        //Table Entry
        tableEntry = new TableForm((new Mongo.ObjectID).toHexString(),"Default Table",new Date(), false, "");
        tableEntryArray = [this.tableEntry]
        locationEntry = new TableLocationForm("","",new Date(),this.tableEntryArray);

        

        //Now that the locations are there needed the tables to help
        locationTables: Observable<TableLocation[]>;
        locationTablesSubscription: Subscription;

        //this is what to keep
        locationName: string;

        locationID: string;

        tableArraySelect: Table[];
        
        tableLocationSelect: TableLocation;

        ngOnInit() {
            this.locationTablesSubscription = MeteorObservable.subscribe('tableLocations').subscribe(() => {
              this.locationTables = TableLocations.find();
            });
            this.locationID = "Test";
          }
          ngOnDestroy() {
            if (this.locationTablesSubscription) {
              this.locationTablesSubscription.unsubscribe();
            }
          }

        addLocation(){
            console.log("Add Location")
            console.log(this.locationEntry)
            Meteor.call('addLocation', this.locationEntry);
        }
        onSelect(){
            //get the id of the table
            this.tableLocationSelect = TableLocations.findOne({"_id": this.locationID})
            //check to see if an object was returned
            if(this.tableLocationSelect){
                this.tableArraySelect = this.tableLocationSelect.tables
                this.locationName = this.tableLocationSelect.name
                console.log(this.tableArraySelect)                  
            }
        }


        //need to add table next
        //need to figure out how to add it to the location.
        //need to add an id and then a table form
        //make an add table button from there hide it if somethig is not set etc.
        addTable(){
            Meteor.call('addNewTable', this.tableLocationSelect);

        }

        removeTableEvent(tableToRemove){
            //console.log("Table to Remove in location");
            tableToRemove.locationid = this.locationID;
            Meteor.call('removeTable',tableToRemove)
            //console.log(tableToRemove);
        }
        editTableEvent(tableToEdit){
            tableToEdit.locationid = this.locationID;
            Meteor.call('editTable',tableToEdit);
        }
        clickCreateLocation(){
            this.createLocation = true;
            this.editLocation = false;
        }

        clickEditLocation(){
            this.createLocation = false;
            this.editLocation = true;
        }
   }