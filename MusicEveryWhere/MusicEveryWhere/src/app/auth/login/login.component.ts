import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ILogin } from '../../Models/ILogin';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private AuthService: AuthService, private router: Router) { }

  login(form: NgForm): void {
    this.AuthService.login(this.username, this.password)
      .pipe(
        tap((data: ILogin) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        })
      )
      .subscribe({
        error: error => console.error('Login failed', error)
      });
  }
}
