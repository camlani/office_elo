import { Meteor } from 'meteor/meteor';

import { TableCounts } from '../../imports/collections/tableCounts';
import { MatchStats } from '../../imports/collections/matchstats';

Meteor.methods({
  addTableCount(tableCountDetails) {
   TableCounts.insert({
    tableName: tableCountDetails.tableName,
    entryCount: tableCountDetails.entryCount
   });
  },
  removeTableCount(_id: string) {
    TableCounts.remove({
      _id
    })
  },
  updateTableCount(tablename, count) {
    TableCounts.update({
     tableName: tablename
    },{
      tableName: tablename,
      entryCount: count
    }, {
      upsert: true
    });
   },
   updateUserCount() {
    var count = Meteor.users.find().count();
    TableCounts.update({
     tableName: 'users'
    },{
      tableName: 'users',
      entryCount: count
    }, {
      upsert: true
    });
   },
   updateMatchCount() {
    var count = MatchStats.find({}).cursor.count();
    console.log(count);
    console.log('updated');
    TableCounts.update({
     tableName: 'MatchStats'
    },{
      tableName: 'MatchStats',
      entryCount: count
    }, {
      upsert: true
    });
   }

})
