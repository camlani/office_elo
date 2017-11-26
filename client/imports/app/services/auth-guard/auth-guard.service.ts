import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate() {
    //console.log('AuthGuard#canActivate called');
    if(Meteor.userId()){
        return true;
    } else {
        alert('Login to Post')
        return false;
    }

  }
}