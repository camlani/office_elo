import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatchEntryComponent } from './match-entry/match-entry.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'todoList',
        component: TodoListComponent,
        data: {
          title: 'Todo List'
        }
      },
      {
        path: 'todoAdd',
        component: TodoAddComponent,
        data: {
          title: 'Add Todo'
        }
      },
      //Match Add
      {
        path: 'matchAdd',
        component: MatchEntryComponent,
        data: {
          title: 'Add Match'
        }
      },
      // Home Page
      {
        path: '',
        redirectTo: '/todoList',
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
    ])
  ],
  declarations: [
    AppComponent,
    TodoAddComponent,
    TodoListComponent,
    MatchEntryComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
