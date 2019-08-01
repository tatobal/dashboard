import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  msg: string;
  display = false;
  error = false;


  constructor(public loginService: LoginService, public afAuth: AngularFireAuth, private router: Router) {
  }


  ngOnInit() {
  }

  login() {
    this.loginService.login(this.email, this.password).then(value => {
      this.msg = value;
      this.router.navigate(['admin/products']);
      this.display = true;
    })
      .catch(err => {
        this.msg = err.message;
        this.display = true;
        this.error = true;
      });
    this.email = '';
    this.password = '';
  }
}
