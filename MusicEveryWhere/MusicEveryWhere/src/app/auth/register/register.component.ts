import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IRegister } from '../../Models/IRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  nome: string = '';
  cognome: string = '';
  citta: string = '';
  tipoIndirizzo: string = '';
  indirizzo: string = '';
  civico: string = '';
  cap: string = '';
  numeroTelefono: string = '';
  avatar: string = '';
  roles: string[] = ['USER'];

  constructor(private AuthService: AuthService, private router: Router) { }

  register(): void {
    const registerData: IRegister = {
      username: this.username,
      email: this.email,
      password: this.password,
      nome: this.nome,
      cognome: this.cognome,
      citta: this.citta,
      tipoIndirizzo: this.tipoIndirizzo,
      indirizzo: this.indirizzo,
      civico: this.civico,
      cap: this.cap,
      numeroTelefono: this.numeroTelefono,
      avatar: this.avatar,
      roles: this.roles
    };
    this.AuthService.register(registerData)
      .pipe(
        tap(() => this.router.navigate(['/auth/login']))
      )
      .subscribe({
        error: error => console.error('Registration failed', error)
      });
  }
}
