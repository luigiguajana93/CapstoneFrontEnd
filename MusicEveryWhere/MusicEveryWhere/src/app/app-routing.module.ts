import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { AdminGuard } from './auth/admin.guard';
import { DettagliProdottoComponent } from './dettagli-prodotto/dettagli-prodotto.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profilo',
    loadChildren: () => import('./pages/profilo/profilo.module').then(m => m.ProfiloModule)
  },
  {
    path: 'noleggio',
    loadChildren: () => import('./pages/noleggio/noleggio.module').then(m => m.NoleggioModule)
  },
  {
    path: 'edit-prodotto',
    loadChildren: () => import('./pages/edit-prodotto/edit-prodotto.module').then(m => m.EditProdottoModule),
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard]
  },
  {
    path: 'carrello',
    loadChildren: () => import('./pages/carrello/carrello.module').then(m => m.CarrelloModule)
  },
  {
    path: 'add-prodotto',
    loadChildren: () => import('./pages/add-prodotto/add-prodotto.module').then(m => m.AddProdottoModule),
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard]
  },
  { path: 'prodotto/:id', component: DettagliProdottoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
