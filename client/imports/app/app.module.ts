import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from './app.component';
import { MatchEntryComponent } from './match-entry/match-entry.component';
import { MatchListComponent } from './match-list/match-list.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { AuthGuard } from './services/auth-guard/auth-guard.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'matchAdd',
        component: MatchEntryComponent,
        data: {
          title: 'Add Match'
        },
        canActivate:[AuthGuard]
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
      {
        path: '',
        component: HomePageComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path:'adminpage',
        component: AdminPageComponent,
        data: {
          title: 'Admin Page'
        }


      },
      // Home Page Redirect
      // {
      //   path: '',
      //   redirectTo: '/matchList',
      //   pathMatch: 'full'
      // },
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
    LoginFormComponent,
    HomePageComponent,
    ProfileComponent,
    AdminPageComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthGuard
  ]
})

export class AppModule { }
