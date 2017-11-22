import './polyfills';

import { Meteor } from 'meteor/meteor';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {

  if (Meteor.isProduction) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule);

});
