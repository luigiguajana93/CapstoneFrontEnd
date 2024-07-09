import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarrelloResponseDTO } from '../Models/ICarrelloResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private apiUrl = 'http://localhost:8080/api/carrelli';

  constructor(private http: HttpClient) {}

  getCarrelloById(userId: number): Observable<ICarrelloResponseDTO> {
    return this.http.get<ICarrelloResponseDTO>(`${this.apiUrl}/${userId}`);
  }

  addProdottoToCarrello(userId: number, prodottoId: number, quantita: number): Observable<ICarrelloResponseDTO> {
    return this.http.post<ICarrelloResponseDTO>(`${this.apiUrl}/utenti/${userId}/prodotti/${prodottoId}`, null, {
      params: {
        quantita: quantita.toString()
      }
    });
  }

  removeProdottoFromCarrello(carrelloId: number, carrelloItemId: number): Observable<ICarrelloResponseDTO> {
    return this.http.put<ICarrelloResponseDTO>(`${this.apiUrl}/${carrelloId}/remove/${carrelloItemId}`, null);
  }

  updateQuantitaProdotto(carrelloId: number, carrelloItemId: number, nuovaQuantita: number): Observable<ICarrelloResponseDTO> {
    return this.http.put<ICarrelloResponseDTO>(`${this.apiUrl}/${carrelloId}/update/${carrelloItemId}`, null, {
      params: {
        nuovaQuantita: nuovaQuantita.toString()
      }
    });
  }

  svuotaCarrello(carrelloId: number): Observable<ICarrelloResponseDTO> {
    return this.http.put<ICarrelloResponseDTO>(`${this.apiUrl}/${carrelloId}/svuota`, null);
  }

  confermaAcquisto(userId: number, prodottiId: number[]): Observable<ICarrelloResponseDTO> {
    return this.http.post<ICarrelloResponseDTO>(`${this.apiUrl}/confermaAcquisto`, { userId, prodottiId });
  }
}
