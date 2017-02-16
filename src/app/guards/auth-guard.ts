import { Injectable } from '@angular/core';
import{ Observable } from 'rxjs/Rx';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor() { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
    
    return true;

  }

  
}
