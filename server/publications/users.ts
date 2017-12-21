import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function() {
    return Meteor.users.find({}, {fields:{displayname:1, username:1, emails:1}});
});