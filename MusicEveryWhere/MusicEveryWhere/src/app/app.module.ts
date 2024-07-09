import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main-components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './main-components/footer/footer.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddProdottoModule } from './pages/add-prodotto/add-prodotto.module';
import { NoleggioModule } from './pages/noleggio/noleggio.module';

import { CarrelloModule } from './pages/carrello/carrello.module';
import { HomeModule } from './pages/home/home.module';
import { ProfiloModule } from './pages/profilo/profilo.module';
import { EditProdottoModule } from './pages/edit-prodotto/edit-prodotto.module';
import { CarrelloService } from './services/carrello.service';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { DettagliProdottoComponent } from './dettagli-prodotto/dettagli-prodotto.component';
import { HomeComponent } from './pages/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DettagliProdottoComponent
  ],
  imports: [
    HomeModule,
    AddProdottoModule,
    CarrelloModule,
    EditProdottoModule,
    ProfiloModule,
    NoleggioModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
