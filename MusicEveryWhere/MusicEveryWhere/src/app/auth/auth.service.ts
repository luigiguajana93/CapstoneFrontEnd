
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogin } from '../Models/ILogin';
import { IRegister } from '../Models/IRegister';
import { IRole } from '../Models/IRole';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/utenti';
  private currentUserSubject: BehaviorSubject<ILogin | null>;
  public currentUser: Observable<ILogin | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ILogin | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ILogin | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(user => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  register(registerData: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`${this.apiUrl}/register`, registerData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): ILogin | null {
    return this.currentUserValue;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? Array.isArray(user.user.roles) && user.user.roles.some((role: IRole) => role.roleType === 'ADMIN') : false;
  }

  getUserIdFromToken(): number | null {

    const token = localStorage.getItem('token');

    if (!token) {

      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      return decoded.id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}
