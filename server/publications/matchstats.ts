import { Meteor } from 'meteor/meteor';

import { MatchStats } from '../../imports/collections/matchstats';

Meteor.publish('matchList', function() {
  return MatchStats.find({});
});

Meteor.publish('profile', function(user:string) {
  return MatchStats.find({
    "$or": [{
      tOneOff: {$regex : user, $options: "i"}
    }, {
      tOneDef: {$regex : user, $options: "i"}
    },{
      tTwoOff: {$regex : user, $options: "i"}
    }, {
      tTwoDef: {$regex : user, $options: "i"}
    }]
  });
});