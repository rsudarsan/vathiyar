import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpGlobalService } from '../../services/httpglobal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._gs.loggedInUser()){
        return true
      } else {
        this._router.navigate(['/'])
        return false
      }
  }

  constructor(private _gs: HttpGlobalService,
              private _router: Router){

  }

  // canActivate(): boolean {
  //   if(this._gs.loggedInUser()){
  //     return true
  //   } else {
  //     this._router.navigate(['/'])
  //     return false
  //   }
  // }
  
}
