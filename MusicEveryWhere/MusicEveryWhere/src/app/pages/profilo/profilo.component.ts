import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente.service';
import { AuthService } from '../../auth/auth.service';
import { IUtente } from '../../Models/IUtente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {
  utente: IUtente | null = null;
  editMode: boolean = false;
  selectedFile: File | null = null;


  constructor(private utenteService: UtenteService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.utenteService.getUtenteById(currentUser.user.id).subscribe(data => {
        this.utente = data;
      });
    }
  }

  enableEditMode(): void {
    this.editMode = true;
  }

  disableEditMode(): void {
    this.editMode = false;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadAvatar(): void {
    if (this.selectedFile && this.utente) {
      this.utenteService.uploadAvatar(this.utente.username, this.selectedFile).subscribe(response => {
        if (this.utente) {
          this.utente.avatar = response.url;
        }
        this.selectedFile = null;
      });
    }
  }

  saveChanges(): void {
    if (this.utente) {
      this.utenteService.updateUtente(this.utente.id, this.utente).subscribe(data => {
        this.utente = data;
        this.disableEditMode();
      });
    }
  }

  tornaIndietro(): void {
    this.router.navigate(['/home']);
  }
}
