import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { MatchStat } from '../models/matchstat';

export const MatchStats = new MongoObservable.Collection<MatchStat>('MatchStats');

function loggedIn() {
    return !!Meteor.user();

}

MatchStats.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
})