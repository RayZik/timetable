import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';



/**
 * Auth guard service
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _router: Router
  ) { }

  /**
   * Check user auth
   */
  canActivate(): boolean {
    const auth = localStorage.getItem('CurUser');
    if (auth === null) {
      this._router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}