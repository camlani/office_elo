import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
    ServiceConfiguration.configurations.remove({
        service: "google"
    });
    ServiceConfiguration.configurations.insert({
        service: "google",
        consumerKey: Meteor.settings.private.oAuth.google.clientId,
        loginStyle: "popup",
        secret: Meteor.settings.private.oAuth.google.secret
    });
});

