import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = 'hola login';

  constructor() {
  }


  ngOnInit() {
  }

  enterLogin() {
    console.log(this.login);
  }
}
