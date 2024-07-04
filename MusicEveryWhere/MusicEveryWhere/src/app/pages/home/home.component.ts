import { Component, OnInit } from '@angular/core';
import { ProdottoService } from '../../services/prodotto.service';
import { IProdotto } from '../../Models/IProdotto';
import { ICategoria } from '../../Models/ICategoria';
import { AuthService } from '../../auth/auth.service';

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


  constructor(private prodottoService: ProdottoService,private authService: AuthService) { }

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
    if (this.searchQuery) {
      this.prodottoService.getProdottiByNome(this.searchQuery).subscribe(data => {
        this.prodotti = data;
      });
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

  aggiungiAlCarrello(prodotto: IProdotto): void {
    const carrelloId = 1; // Ottieni l'ID del carrello dell'utente loggato
    const quantita = 1; // Quantità da aggiungere
    this.prodottoService.aggiungiAlCarrello(carrelloId, prodotto.id, quantita).subscribe(() => {
      console.log('Prodotto aggiunto al carrello');
    });
  }

  aggiungiANoleggio(prodotto: IProdotto): void {
    const noleggioId = 1; // Ottieni l'ID del noleggio dell'utente loggato
    this.prodottoService.aggiungiANoleggio(noleggioId, prodotto.id).subscribe(() => {
      console.log('Prodotto aggiunto al noleggio');
    });
  }

}
