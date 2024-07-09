import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { IProdotto } from '../../Models/IProdotto';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {
  prodottiCarrello: IProdotto[] = [];
  costoTotale: number = 0;

  constructor(private carrelloService: CarrelloService, private authService: AuthService) {}

  ngOnInit(): void {
    this.prodottiCarrello = this.getProdottiCarrello();
    this.calculateCostoTotale();
  }

  getProdottiCarrello(): IProdotto[] {
    return JSON.parse(localStorage.getItem('prodottiCarrello') || '[]');
  }

  calculateCostoTotale(): void {
    this.costoTotale = this.prodottiCarrello.reduce((acc, prodotto) => {
      return acc + prodotto.prezzo;
    }, 0);
  }

  svuotaCarrello(): void {
    this.prodottiCarrello = [];
    this.costoTotale = 0;
    localStorage.removeItem('prodottiCarrello');
  }

  confermaAcquisto(): void {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('Utente non loggato');
      return;
    }

    const prodottiId = this.prodottiCarrello.map(prodotto => prodotto.id);
    this.carrelloService.confermaAcquisto(userId, prodottiId).subscribe(response => {
      console.log('Acquisto confermato con successo', response);
      this.svuotaCarrello();
    });
  }
}
