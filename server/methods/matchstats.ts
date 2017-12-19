import { Meteor } from 'meteor/meteor';

import { MatchStats } from '../../imports/collections/matchstats';
import { console } from 'meteor/tools';

Meteor.methods({
  addMatchStats(matchDetails) {
   MatchStats.insert({
    tOneOff: matchDetails.tOneOff,
    tOneDef: matchDetails.tOneDef,
    tTwoOff: matchDetails.tTwoOff,
    tTwoDef: matchDetails.tTwoDef,
    tOneRotate: matchDetails.tOneRotate,
    tTwoRotate : matchDetails.tTwoRotate,
    mTime: matchDetails.mTime,
    tOneWin: matchDetails.tOneWin,
    wScore: Number(matchDetails.wScore),
    lScore: Number(matchDetails.lScore),
    verif: matchDetails.verif,
    userEntry: matchDetails.userEntry
   });
//wScore: Number(matchDetails.wScore),
//lScore: Number(matchDetails.lScore),
   var count = MatchStats.find({}).cursor.count();
   
   Meteor.call('updateMatchCount');

  },
  removeMatchStats(_id: string) {
    MatchStats.remove({
      _id
    })
  }
})
