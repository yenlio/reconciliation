import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('accessToken') != null) {
      // check role
      const roles = JSON.parse(localStorage['permission']);

      if (roles) {
        // check if router has role
        if (
          next.data['permission'] &&
          !next.data['permission'].some((role: string) => roles.includes(role))
        ) {
          // not authorized to direct to unauthorized page
          alert('Không có quyền thực hiện!');
          return false;
        } else {
          return true;
        }
      } else {
        // not authorized to direct to unauthorized page
        this.router.navigate(['/authorized']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
