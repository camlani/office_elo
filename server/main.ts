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

Accounts.onCreateUser( ( options, user ) => {
    let profile = options.profile;
 
    if(!user.services.google){
        if ( profile ) {
            user.profile = profile;
        }
    
    } else {
        const {name} = user.services.google;
        user.username = name;
    }


    user._id = Random.id();

    return user;
  });


//Need to finish main.ts