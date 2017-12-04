import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Table,TableLocation } from '../models/locations';

export const TableLocations = new MongoObservable.Collection<TableLocation>('TableLocations');

function loggedIn() {
    return !!Meteor.user();

}

TableLocations.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
})