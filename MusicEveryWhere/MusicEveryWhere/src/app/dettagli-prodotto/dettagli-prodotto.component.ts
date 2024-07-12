import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProdotto } from '../Models/IProdotto';
import { ProdottoService } from '../services/prodotto.service';

declare var bootstrap: any;

@Component({
  selector: 'app-dettagli-prodotto',
  templateUrl: './dettagli-prodotto.component.html',
  styleUrls: ['./dettagli-prodotto.component.scss']
})
export class DettagliProdottoComponent implements OnInit {
  prodotto: IProdotto | undefined;
  modalMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private prodottoService: ProdottoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const prodottoId = +params.get('id')!;
      this.getProdotto(prodottoId);
    });
  }

  getProdotto(prodottoId: number): void {
    this.prodottoService.getProdottoById(prodottoId).subscribe(prodotto => {
      this.prodotto = prodotto;
    });
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
    }, 2000);
  }

  tornaIndietro(): void {
    this.router.navigate(['/home']);
  }
}
