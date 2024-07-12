import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdottoService } from '../../services/prodotto.service';

import { Router } from '@angular/router';
import { ICategoria } from '../../Models/ICategoria';

declare var bootstrap: any;

@Component({
  selector: 'app-add-prodotto',
  templateUrl: './add-prodotto.component.html',
  styleUrls: ['./add-prodotto.component.scss']
})
export class AddProdottoComponent implements OnInit {
  prodottoForm: FormGroup;
  categorie: ICategoria[] = [];
  modalMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private prodottoService: ProdottoService,
    private router: Router
  ) {
    this.prodottoForm = this.fb.group({
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
  }

  loadCategorie(): void {
    this.prodottoService.getAllCategorie().subscribe((data) => {
      this.categorie = data;
    });
  }

  onSubmit(): void {
    if (this.prodottoForm.valid) {
      this.prodottoService.createProdotto(this.prodottoForm.value).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
  
}
