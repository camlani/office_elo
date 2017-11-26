import { Meteor } from 'meteor/meteor';

import { MatchStats } from '../../imports/collections/matchstats';

Meteor.methods({
  addMatchStats(matchDetails) {
   // Todos.insert({ t });
   MatchStats.insert({
    tOneOff: matchDetails.tOneOff,
    tOneDef: matchDetails.tOneDef,
    tTwoOff: matchDetails.tTwoOff,
    tTwoDef: matchDetails.tTwoDef,
    tOneRotate: matchDetails.tOneRotate,
    tTwoRotate : matchDetails.tTwoRotate,
    mTime: matchDetails.mTime,
    tOneWin: matchDetails.tOneWin,
    wScore: matchDetails.wScore,
    lScore: matchDetails.lScore,
    verif: matchDetails.verif,
    userEntry: matchDetails.userEntry

   });
  },
  removeMatchStats(_id: string) {
    MatchStats.remove({
      _id
    })
  }
})
