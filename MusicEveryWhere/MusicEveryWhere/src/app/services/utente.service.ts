import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUtente } from '../Models/IUtente';


@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) {}

  getUtenteById(id: number): Observable<IUtente> {
    return this.http.get<IUtente>(`${this.apiUrl}/${id}`);
  }

  updateUtente(id: number, utente: IUtente): Observable<IUtente> {
    return this.http.put<IUtente>(`${this.apiUrl}/${id}`, utente);
  }

  uploadAvatar(username: string, file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/${username}/avatar`, formData);
  }
}
