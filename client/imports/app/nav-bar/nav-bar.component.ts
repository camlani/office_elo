import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.html',
    styleUrls: ['nav-bar.scss']
  })
  export class NavBarComponent {
    ngOnInit() {
    }
}  