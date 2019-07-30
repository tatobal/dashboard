import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private afsAuth: AngularFireAuth, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.afsAuth.authState
            .pipe(take(1))
            .pipe(map(authState => !!authState))
            .pipe(tap(auth => {
                if (!auth) {
                    this.router.navigate(['/admin']);
                }
            }
            ));
    }
}
