import { Meteor } from 'meteor/meteor';
import { MatchStats } from '../imports/collections/matchstats';
import './modules/configure-services.js';

Meteor.startup(() => {

    if (MatchStats.find({}).cursor.count() === 0){
  
        var objecttoInsert = {
            tOneOff: "Cameron",
            tOneDef: "Lofton",
            tTwoOff: "Shawn",
            tTwoDef: "Elaine",
            tOneRotate: false,
            tTwoRotate : false,
            mTime: new Date(),
            tOneWin: false,
            wScore: 10,
            lScore: 5,
            verif: false
        }
        Meteor.call('addMatchStats', objecttoInsert);

    }

});

//Need to finish main.ts