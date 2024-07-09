import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdotto } from '../Models/IProdotto';
import { ICarrelloItem } from '../Models/ICarrelloItem';
import { ICategoria } from '../Models/ICategoria';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private apiUrl = 'http://localhost:8080/api/prodotti';
  private carrelloUrl = 'http://localhost:8080/api/carrelli';
  private noleggioUrl = 'http://localhost:8080/api/noleggi';
  private categorieUrl = 'http://localhost:8080/api/categorie';

  constructor(private http: HttpClient) { }

  getAllProdotti(): Observable<IProdotto[]> {
    return this.http.get<IProdotto[]>(this.apiUrl);
  }

  getProdottiByNome(nomeProdotto: string): Observable<IProdotto[]> {
    const params = new HttpParams().set('nomeProdotto', nomeProdotto);
    return this.http.get<IProdotto[]>(`${this.apiUrl}/nome`, { params });
  }

  getProdottiByCategoria(categoriaId: number): Observable<IProdotto[]> {
    const params = new HttpParams().set('categoriaId', categoriaId.toString());
    return this.http.get<IProdotto[]>(`${this.apiUrl}/categoria`, { params });
  }

  getAllCategorie(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(this.categorieUrl);
  }

  aggiungiAlCarrello(carrelloId: number, prodottoId: number, quantita: number): Observable<ICarrelloItem> {
    return this.http.post<ICarrelloItem>(`${this.carrelloUrl}/${carrelloId}/items`, { prodottoId, quantita });
  }

  aggiungiANoleggio(noleggioId: number, prodottoId: number): Observable<any> {
    return this.http.post<any>(`${this.noleggioUrl}/${noleggioId}/items`, { prodottoId });
  }

  createProdotto(prodotto: IProdotto): Observable<IProdotto> {
    return this.http.post<IProdotto>(this.apiUrl, prodotto, this.getHttpOptions());
  }

  updateProdotto(prodotto: IProdotto): Observable<IProdotto> {
    return this.http.put<IProdotto>(`${this.apiUrl}/${prodotto.id}`, prodotto, this.getHttpOptions());
  }

  deleteProdotto(prodottoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${prodottoId}`,{responseType: 'text' as 'json'});
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getProdottoById(prodottoId: number): Observable<IProdotto> {
    return this.http.get<IProdotto>(`${this.apiUrl}/${prodottoId}`);
  }
}
