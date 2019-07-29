import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { ConectionService } from '../../services/conection.service';


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


  constructor(public conectionService: ConectionService, public afAuth: AngularFireAuth, private router: Router) {
    console.log(this.email);
  }


  ngOnInit() {
  }

  login() {
    /* console.log('Te estas logeando');
    console.log('Email: ', this.email);
    console.log('Password:', this.password);
    this.conectionService.login(this.email, this.password).then(value => {
      this.msg = value;
      this.display = true;
      console.log('Entraste');
    })
      .catch(err => {
        console.log('Algo saliò mal');
        this.msg = err.message;
        this.display = true;
      });
    this.email = '';
    this.password = '';
  } */
  this.conectionService.login(this.email, this.password).then((res) => {
    this.router.navigate(['admin/products']);
  }).catch(err => console.log('err', err.message));

  }

}
