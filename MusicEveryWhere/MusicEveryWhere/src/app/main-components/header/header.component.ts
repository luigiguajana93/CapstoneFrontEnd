import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../Models/ILogin';
import { IRole } from '../../Models/IRole';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: ILogin | null = null;

  constructor(public authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSvc.currentUser.subscribe(user => {
      console.log('User:', user);
      if (user) {
        console.log('Roles:', user.user.roles);
        this.isUserLoggedIn = true;
        this.isAdmin = user.user.roles.some((role: IRole) => role.roleType === 'ADMIN');
      } else {
        this.isUserLoggedIn = false;
        this.isAdmin = false;
      }
      this.currentUser = user;
    });
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/auth/login']);
  }
}
