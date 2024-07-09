import { CittaNoleggio } from './../../Models/CIttaNoleggio';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProdotto } from '../../Models/IProdotto';
import { AuthService } from '../../auth/auth.service';
import { NoleggioService } from '../../services/noleggio.service';

import { INoleggioRequestDTO } from '../../Models/INoleggioRequestDTO';

@Component({
  selector: 'app-noleggio',
  templateUrl: './noleggio.component.html',
  styleUrls: ['./noleggio.component.scss']
})
export class NoleggioComponent implements OnInit {
  noleggioForm: FormGroup;
  prodottiNoleggiati: IProdotto[] = [];
  cittaNoleggio = CittaNoleggio;
  costoNoleggioTotale: number = 0;

  constructor(
    private fb: FormBuilder,
    private noleggioService: NoleggioService,
    private authService: AuthService
  ) {
    this.noleggioForm = this.fb.group({
      dataInizioNoleggio: ['', Validators.required],
      dataFineNoleggio: ['', Validators.required],
      cittaNoleggio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.prodottiNoleggiati = this.getProdottiNoleggiati();
    this.calculateCostoNoleggioTotale();
  }

  getProdottiNoleggiati(): IProdotto[] {
    return JSON.parse(localStorage.getItem('prodottiNoleggiati') || '[]');
  }

  calculateCostoNoleggioTotale(): void {
    const dataInizio = new Date(this.noleggioForm.get('dataInizioNoleggio')?.value);
    const dataFine = new Date(this.noleggioForm.get('dataFineNoleggio')?.value);
    const numeroGiorni = Math.ceil((dataFine.getTime() - dataInizio.getTime()) / (1000 * 3600 * 24));
    this.costoNoleggioTotale = this.prodottiNoleggiati.reduce((acc, prodotto) => {
      return acc + prodotto.prezzo * 0.10 * numeroGiorni;
    }, 0);
  }

  onSubmit(): void {
    if (this.noleggioForm.valid) {
      const userId = this.authService.getUserIdFromToken();
      if (!userId) {
        console.error('Utente non loggato');
        return;
      }

      const noleggioRequest: INoleggioRequestDTO = {
        utenteId: userId,
        prodottiId: this.prodottiNoleggiati.map(prodotto => prodotto.id),
        dataInizioNoleggio: this.noleggioForm.get('dataInizioNoleggio')?.value,
        dataFineNoleggio: this.noleggioForm.get('dataFineNoleggio')?.value,
        cittaNoleggio: this.noleggioForm.get('cittaNoleggio')?.value
      };

      this.noleggioService.createNoleggio(noleggioRequest).subscribe(response => {
        console.log('Noleggio creato con successo', response);
        // Reset prodotti noleggiati
        this.svuotaNoleggio();
      });
    }
  }

  svuotaNoleggio(): void {
    this.prodottiNoleggiati = [];
    this.costoNoleggioTotale = 0;
    localStorage.removeItem('prodottiNoleggiati');
  }
}
