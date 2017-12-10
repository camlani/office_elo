import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { TableCount } from '../models/tableCount';

export const TableCounts = new MongoObservable.Collection<TableCount>('TableCounts');

function loggedIn() {
    return !!Meteor.user();

}

TableCounts.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
})