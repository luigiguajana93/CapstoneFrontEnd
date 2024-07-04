import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdottoService } from '../../services/prodotto.service';
import { IProdotto } from '../../Models/IProdotto';
import { ICategoria } from '../../Models/ICategoria';


@Component({
  selector: 'app-edit-prodotto',
  templateUrl: './edit-prodotto.component.html',
  styleUrls: ['./edit-prodotto.component.scss']
})
export class EditProdottoComponent implements OnInit {
  prodotti: IProdotto[] = [];
  categorie: ICategoria[] = [];
  selectedProdotto: IProdotto | null = null;
  searchQuery: string = '';
  prodottoForm: FormGroup;

  constructor(
    private prodottoService: ProdottoService,
    private fb: FormBuilder
  ) {
    this.prodottoForm = this.fb.group({
      id: [''],
      nomeProdotto: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      categoriaId: ['', Validators.required],
      isDisponibile: [true]
    });
  }

  ngOnInit(): void {
    this.loadCategorie();
    this.loadProdotti();
  }

  loadCategorie(): void {
    this.prodottoService.getAllCategorie().subscribe(data => {
      this.categorie = data;
    });
  }

  loadProdotti(): void {
    this.prodottoService.getAllProdotti().subscribe(data => {
      this.prodotti = data;
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

  selectProdotto(prodotto: IProdotto): void {
    this.selectedProdotto = prodotto;
    this.prodottoForm.patchValue(prodotto);
  }

  onSubmit(): void {
    if (this.prodottoForm.valid) {
      this.prodottoService.updateProdotto(this.prodottoForm.value).subscribe(() => {
        this.loadProdotti();
        this.selectedProdotto = null;
      });
    }
  }

  deleteProdotto(prodotto: IProdotto): void {
    this.prodottoService.deleteProdotto(prodotto.id).subscribe(() => {
      this.loadProdotti();
    });
  }
}
