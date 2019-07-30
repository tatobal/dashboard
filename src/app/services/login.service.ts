import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private auth: AngularFireAuth) {
  }

  login(email: string, password: string): any {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.auth.signOut();
  }
}
