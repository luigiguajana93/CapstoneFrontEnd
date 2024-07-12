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
  selectedFile: File | null = null;
  modalMessage: string = '';
  imageUploaded: boolean = false;

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


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.prodottoService.uploadImage(formData).subscribe(
        response => {
          const imageUrl = response.url; // Assicurati che questa chiave corrisponda alla tua risposta backend
          this.prodottoForm.patchValue({ imageUrl });
          this.selectedFile = null;
          this.imageUploaded = true; // Imposta su true quando l'immagine è stata caricata con successo
        },
        error => {
          console.error('Errore durante il caricamento dell\'immagine', error);
        }
      );
    }
  }
}
