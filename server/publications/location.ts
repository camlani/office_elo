import { Meteor } from 'meteor/meteor';

import { TableLocations } from '../../imports/collections/locations';

Meteor.publish('tableLocations', function() {
  return TableLocations.find({});
});
