import { Meteor } from 'meteor/meteor';

import { MatchStats } from '../../imports/collections/matchstats';

Meteor.publish('matchList', function() {
  return MatchStats.find({});
});
