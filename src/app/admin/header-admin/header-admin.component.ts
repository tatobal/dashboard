import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  constructor(
    private login: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/admin']);
  }

}
