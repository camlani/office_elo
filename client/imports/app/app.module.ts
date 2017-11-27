import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MatchEntryComponent } from './match-entry/match-entry.component';
import { MatchListComponent } from './match-list/match-list.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AuthGuard } from './services/auth-guard/auth-guard.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      //Match Add
      {
        path: 'matchAdd',
        component: MatchEntryComponent,
        data: {
          title: 'Add Match'
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'matchList',
        component: MatchListComponent,
        data: {
          title: 'Match List'
        }
      },
      {
        path: 'signup',
        component: SignupFormComponent,
        data: {
          title: 'Sign Up'
        } 
      },
      {
        path: 'login',
        component: LoginFormComponent,
        data: {
          title: 'Log In'
        } 
      },
      // Home Page
      {
        path: '',
        redirectTo: '/matchList',
        pathMatch: 'full'
      },
      // 404 Page
      {
        path: '**',
        component: PageNotFoundComponent,
        data: {
          title: '404 Page Not Found'
        }
      }
    ]),
    AccountsModule
  ],
  declarations: [
    AppComponent,
    MatchEntryComponent,
    MatchListComponent,
    PageNotFoundComponent,
    NavBarComponent,
    SignupFormComponent,
    LoginFormComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthGuard
  ]
})

export class AppModule { }
