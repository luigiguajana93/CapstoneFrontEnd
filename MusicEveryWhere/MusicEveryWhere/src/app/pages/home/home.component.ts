import { CarrelloService } from './../../services/carrello.service';
import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../../services/prodotto.service';
import { IProdotto } from '../../Models/IProdotto';
import { ICategoria } from '../../Models/ICategoria';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  prodotti: IProdotto[] = [];
  categorie: ICategoria[] = [];
  searchQuery: string = '';
  selectedCategoriaId: number | null = null;
  modalMessage: string = '';

  constructor(
    private prodottoService: ProdottoService,
    private authService: AuthService,
    private carrelloService: CarrelloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProdotti();
    this.loadCategorie();
  }

  loadProdotti(): void {
    if (this.selectedCategoriaId) {
      this.prodottoService.getProdottiByCategoria(this.selectedCategoriaId).subscribe(data => {
        this.prodotti = data;
      });
    } else {
      this.prodottoService.getAllProdotti().subscribe(data => {
        this.prodotti = data;
      });
    }
  }

  loadCategorie(): void {
    this.prodottoService.getAllCategorie().subscribe(data => {
      this.categorie = data;
    });
  }

  searchProdotti(): void {
    this.filterProdotti();
  }

  filterProdotti(): void {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.prodotti = this.prodotti.filter(prodotto =>
        prodotto.nomeProdotto.toLowerCase().includes(query)
      );
    } else {
      this.loadProdotti();
    }
  }

  filterByCategoria(categoriaId: number): void {
    this.selectedCategoriaId = categoriaId;
    this.loadProdotti();
  }

  resetCategoria(): void {
    this.selectedCategoriaId = null;
    this.loadProdotti();
  }

  vaiAiDettagliProdotto(prodottoId: number): void {
    this.router.navigate(['/prodotto', prodottoId]);
  }

  aggiungiAlCarrello(prodotto: IProdotto): void {
    let prodottiCarrello: IProdotto[] = JSON.parse(localStorage.getItem('prodottiCarrello') || '[]');
    prodottiCarrello.push(prodotto);
    localStorage.setItem('prodottiCarrello', JSON.stringify(prodottiCarrello));
    console.log('Prodotto aggiunto al carrello');
    this.showModal('Aggiunto al Carrello ✔️');
  }

  aggiungiANoleggio(prodotto: IProdotto): void {
    let prodottiNoleggiati: IProdotto[] = JSON.parse(localStorage.getItem('prodottiNoleggiati') || '[]');
    prodottiNoleggiati.push(prodotto);
    localStorage.setItem('prodottiNoleggiati', JSON.stringify(prodottiNoleggiati));
    console.log('Prodotto aggiunto al noleggio');
    this.showModal('Aggiunto al Noleggio ✔️');

  }

  showModal(message: string): void {
    this.modalMessage = message;
    const modalElement = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
    setTimeout(() => {
      modal.hide();
    }, 1000);
  }
}
