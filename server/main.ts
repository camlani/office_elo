import { Meteor } from 'meteor/meteor';
import { MatchStats } from '../imports/collections/matchstats';
import { Roles } from 'meteor/alanning:roles';

import './modules/configure-services.js';

Meteor.startup(() => {

    Meteor.call('updateUserCount');
    Meteor.call('updateMatchCount');

    // if (MatchStats.find({}).cursor.count() === 0){
  
    //     var objecttoInsert = {
    //         tOneOff: "Cameron",
    //         tOneDef: "Lofton",
    //         tTwoOff: "Shawn",
    //         tTwoDef: "Elaine",
    //         tOneRotate: false,
    //         tTwoRotate : false,
    //         mTime: new Date(),
    //         tOneWin: false,
    //         wScore: 10,
    //         lScore: 5,
    //         verif: false
    //     }
    //     Meteor.call('addMatchStats', objecttoInsert);

    // }

   //turn whoever into an admin with the highest group

Roles.addUsersToRoles("6mbJ6CMEmptFtuy2G", 'super-admin' )


});

Accounts.onCreateUser( ( options, user ) => {
    let profile = options.profile;
 
    if(!user.services.google){
        if ( profile ) {
            user.profile = profile;
        }
        user.displayname = "";
    } else {
        const {email, name} = user.services.google;
        user.username = email;
        user.displayname = name;
    }


 

    return user;
  });


//Need to finish main.ts