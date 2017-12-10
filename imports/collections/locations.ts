import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Roles } from 'meteor/alanning:roles';

import { Table,TableLocation } from '../models/locations';

export const TableLocations = new MongoObservable.Collection<TableLocation>('TableLocations');

function loggedIn() {
    return !!Meteor.user();

}

function isAdmin() {
    return Roles.userIsInRole(Meteor.userId,['super-admin']);
}

TableLocations.allow({
    insert: isAdmin,
    update: isAdmin,
    remove: isAdmin
})