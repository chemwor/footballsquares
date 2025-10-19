import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userResolved$.pipe(
      filter(resolved => resolved), // Wait until user state is resolved
      take(1),
      map(() => {
        if (this.authService.isAuthenticated()) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth/signin']);
        }
      })
    );
  }
}
