import { Meteor } from 'meteor/meteor';

import { TableCounts } from '../../imports/collections/tableCounts';

Meteor.publish('tableCounts', function() {
  return TableCounts.find({});
});