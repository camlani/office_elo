import { Meteor } from 'meteor/meteor';

import { MatchStats } from '../../imports/collections/matchstats';

Meteor.methods({
  addMatchStats(objectToInsert) {
   // Todos.insert({ t });
   MatchStats.insert({
    objectToInsert
   });
  },
  removeMatchStats(_id: string) {
    MatchStats.remove({
      _id
    })
  }
})
