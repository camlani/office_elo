import { Meteor } from 'meteor/meteor';

import { TableLocations } from '../../imports/collections/locations';

import { Table, TableLocation } from '../../imports/models/locations'
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({

    addLocation(locationEntry) {
        //tablelocations

        if(Roles.userIsInRole(Meteor.userId(),['super-admin'])){
            TableLocations.insert({
                name: locationEntry.name,
                dateAdded: locationEntry.dateAdded,
                tables: locationEntry.tables,
                userAdded: Meteor.userId()
            });
        }

        // TableLocations.insert({
        //     name: locationEntry.name,
        //     dateAdded: locationEntry.dateAdded,
        //     tables: locationEntry.tables,
        //     userAdded: Meteor.userId()
        // });


    },

    removeLocations(_id: string) {
        //check to see if user roles
        if(Roles.userIsInRole(Meteor.userId(),['super-admin'])){
            TableLocations.remove({
                _id
            })
        }

    },
    //Adds New Default Table
    addNewTable(locationEntry){

        //find the object then update the table
        if(Roles.userIsInRole(Meteor.userId(),['super-admin'])){
            // TableLocations.insert({
            //     name: locationEntry.name,
            //     dateAdded: locationEntry.dateAdded,
            //     tables: locationEntry.tables,
            //     userAdded: Meteor.userId()
            // });
            //How I can update
            //db.TableLocations.update({"_id":"hYiHziqdfKcDmsv3g","tables.id":"7b502cb7ca0ef01455f5efc4"},{$set: {"tables.$.name":"Lunch"}})
            console.log("Called New Table");
            //this works now just make it variable
            var newTable :  Table= {
                id: (new Mongo.ObjectID).toHexString(),
                name: "Default Table",
                dateAdded: new Date(),
                status: false,
                sport: ""
            }
            TableLocations.update({_id:locationEntry._id },{$push: {tables: newTable}})
            //TableLocations.update({_id:locationEntry._id,"tables.id":"7b502cb7ca0ef01455f5efc4"},{$set: {"tables.$.name":"Lunch Test"}})
            
        }

    },
    removeTable(tableToRemove){
        //console.log(tableToRemove);
        TableLocations.update({_id: tableToRemove.locationid},{$pull: {tables: {id:tableToRemove.id} }})
    },
    editTable(tableToEdit){

        TableLocations.update({_id: tableToEdit.locationid, "tables.id":tableToEdit.id }, {$set: {"tables.$.name":tableToEdit.name, "tables.$.status":tableToEdit.status,"tables.$.sport": tableToEdit.sport}})
    }

})