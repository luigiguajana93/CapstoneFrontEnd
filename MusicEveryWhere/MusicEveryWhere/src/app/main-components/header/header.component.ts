import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
isUserLoggedIn:boolean = false;
  isAdmin:boolean = false

  constructor(public authSvc: AuthService) {}



  logout() {
    this.authSvc.logout();
  }

}
