import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INoleggioRequestDTO } from '../Models/INoleggioRequestDTO';
import { INoleggioResponseDTO } from '../Models/INoleggioResponseDTO';


@Injectable({
  providedIn: 'root'
})
export class NoleggioService {
  private baseUrl = 'http://localhost:8080/api/noleggi';

  constructor(private http: HttpClient) {}

  createNoleggio(noleggioRequest: INoleggioRequestDTO): Observable<INoleggioResponseDTO> {
    return this.http.post<INoleggioResponseDTO>(`${this.baseUrl}`, noleggioRequest);
  }
}
