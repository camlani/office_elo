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
  },
  getUsersBuddy(username:string) {
    var matches = MatchStats.find({
      "$or": [{
        tOneOff: {$regex : username, $options: "i"}
      }, {
        tOneDef: {$regex : username, $options: "i"}
      },{
        tTwoOff: {$regex : username, $options: "i"}
      }, {
        tTwoDef: {$regex : username, $options: "i"}
      }]
    }).fetch();

    var userCountHashTable = {};
    matches.forEach((match)=>{
      if ((match.tOneOff===username || match.tOneDef===username)&&(match.tOneWin)){
        if (match.tOneOff!==username){
          if (match.tOneOff in userCountHashTable){
            userCountHashTable[match.tOneOff] = userCountHashTable[match.tOneOff]++;
          } else {
            userCountHashTable[match.tOneOff] = 1;
          }       
        } else {
          if (match.tOneDef in userCountHashTable){
            userCountHashTable[match.tOneDef]++;
          } else {
            userCountHashTable[match.tOneDef] = 1;
          }   
        }
      } else if ((match.tTwoOff===username || match.tTwoDef===username)&&(!match.tOneWin)){
        if (match.tTwoOff!==username){
          if (match.tTwoOff in userCountHashTable){
            userCountHashTable[match.tTwoOff]++;
          } else {
            userCountHashTable[match.tTwoOff] = 1;
          }       
        } else {
          if (match.tTwoDef in userCountHashTable){
            userCountHashTable[match.tTwoDef]++;
          } else {
            userCountHashTable[match.tTwoDef] = 1;
          }   
        }
      } 
    });

    var buddy:string;
    var buddyList = [];
    var buddyFrequency = -1;

    for(var user in userCountHashTable) {
      var num = userCountHashTable[user];
      if (num===buddyFrequency){
        if (buddyList.length === 0){
          buddyList.push(buddy);
        }             
        buddyList.push(user);
      }
      else if (num>buddyFrequency){
        buddy = user;
        buddyFrequency = num;
        buddyList = [];
      }     
    }

    if (buddyList.length != 0){
      buddy = buddyList.join(", ");
    } else {
      buddy = buddy;
    }
    return buddy;
  },
  getUsersNemesis(username:string) {
    var matches = MatchStats.find({
      "$or": [{
        tOneOff: {$regex : username, $options: "i"}
      }, {
        tOneDef: {$regex : username, $options: "i"}
      },{
        tTwoOff: {$regex : username, $options: "i"}
      }, {
        tTwoDef: {$regex : username, $options: "i"}
      }]
    }).fetch();

    var userCountHashTable = {};
    matches.forEach((match)=>{
      if ((match.tOneOff===username || match.tOneDef===username)&&(!match.tOneWin)){
        if (match.tTwoOff in userCountHashTable){
          userCountHashTable[match.tTwoOff]++;
        } else {
          userCountHashTable[match.tTwoOff] = 1;
        }       
        if (match.tTwoDef in userCountHashTable){
          userCountHashTable[match.tTwoDef]++;
        } else {
          userCountHashTable[match.tTwoDef] = 1;
        }         
      } else if ((match.tTwoOff===username || match.tTwoDef===username)&&(match.tOneWin)){
        if (match.tOneOff in userCountHashTable){
          userCountHashTable[match.tOneOff]++;
        } else {
          userCountHashTable[match.tOneOff] = 1;
        }       
        if (match.tOneDef in userCountHashTable){
          userCountHashTable[match.tOneDef]++;
        } else {
          userCountHashTable[match.tOneDef] = 1;
        }   
      } 
    });

    var nemesis:string;
    var nemesisList = [];
    var nemesisFrequency = -1;

    for(var user in userCountHashTable) {
      var num = userCountHashTable[user];
      if (num===nemesisFrequency){
        if (nemesisList.length === 0){
          nemesisList.push(nemesis);
        }             
        nemesisList.push(user);
      }
      else if (num>nemesisFrequency){
        nemesis = user;
        nemesisFrequency = num;
        nemesisList = [];
      }     
    }

    if (nemesisList.length != 0){
      nemesis = nemesisList.join(", ");
    } else {
      nemesis = nemesis;
    }
    return nemesis;
  },
  getMostFrequentPartner(username:string) {
    var matches = MatchStats.find({
      "$or": [{
        tOneOff: {$regex : username, $options: "i"}
      }, {
        tOneDef: {$regex : username, $options: "i"}
      },{
        tTwoOff: {$regex : username, $options: "i"}
      }, {
        tTwoDef: {$regex : username, $options: "i"}
      }]
    }).fetch();

    var userCountHashTable = {};
    matches.forEach((match)=>{
      if ((match.tOneOff===username || match.tOneDef===username)){
        if (match.tOneOff!==username){
          if (match.tOneOff in userCountHashTable){
            userCountHashTable[match.tOneOff] = userCountHashTable[match.tOneOff]++;
          } else {
            userCountHashTable[match.tOneOff] = 1;
          }       
        } else {
          if (match.tOneDef in userCountHashTable){
            userCountHashTable[match.tOneDef]++;
          } else {
            userCountHashTable[match.tOneDef] = 1;
          }   
        }
      } else if ((match.tTwoOff===username || match.tTwoDef===username)){
        if (match.tTwoOff!==username){
          if (match.tTwoOff in userCountHashTable){
            userCountHashTable[match.tTwoOff]++;
          } else {
            userCountHashTable[match.tTwoOff] = 1;
          }       
        } else {
          if (match.tTwoDef in userCountHashTable){
            userCountHashTable[match.tTwoDef]++;
          } else {
            userCountHashTable[match.tTwoDef] = 1;
          }   
        }
      } 
    });

    var partner:string;
    var partnerList = [];
    var partnerFrequency = -1;

    for(var user in userCountHashTable) {
      var num = userCountHashTable[user];
      if (num===partnerFrequency){
        if (partnerList.length === 0){
          partnerList.push(partner);
        }             
        partnerList.push(user);
      }
      else if (num>partnerFrequency){
        partner = user;
        partnerFrequency = num;
        partnerList = [];
      }     
    }

    if (partnerList.length != 0){
      partner = partnerList.join(", ");
    } else {
      partner = partner;
    }
    return partner;
  }
})
