import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdottoService } from '../../services/prodotto.service';
import { IProdotto } from '../../Models/IProdotto';
import { ICategoria } from '../../Models/ICategoria';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-prodotto',
  templateUrl: './edit-prodotto.component.html',
  styleUrls: ['./edit-prodotto.component.scss']
})
export class EditProdottoComponent implements OnInit {
  prodotti: IProdotto[] = [];
  categorie: ICategoria[] = [];
  selectedProdotto: IProdotto | null = null;
  prodottoToDelete: IProdotto | null = null;
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

  selectProdotto(prodotto: IProdotto): void {
    this.selectedProdotto = prodotto;
    this.prodottoForm.patchValue(prodotto);
  }

  confirmDelete(prodotto: IProdotto): void {
    this.prodottoToDelete = prodotto;
    const deleteModal: any = document.getElementById('confirmDeleteModal');
    const modalInstance = new bootstrap.Modal(deleteModal);
    modalInstance.show();
  }

  deleteConfirmed(): void {
    if (this.prodottoToDelete) {
      this.prodottoService.deleteProdotto(this.prodottoToDelete.id).subscribe(
        () => {
          console.log(this.prodottoToDelete?.id)
          this.prodotti = this.prodotti.filter(p => p.id !== this.prodottoToDelete!.id);
          this.prodottoToDelete = null;
        }
      );
    }
  }

  onSubmit(): void {
    if (this.prodottoForm.valid) {
      this.prodottoService.updateProdotto(this.prodottoForm.value).subscribe(() => {
        this.loadProdotti();
        this.selectedProdotto = null;
        const editModal = document.getElementById('editProdottoModal');
        const modalInstance = bootstrap.Modal.getInstance(editModal);
        modalInstance.hide();
      });
    }
  }
}
