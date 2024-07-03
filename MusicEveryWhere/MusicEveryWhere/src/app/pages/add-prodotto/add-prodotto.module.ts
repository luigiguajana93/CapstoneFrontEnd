import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProdottoRoutingModule } from './add-prodotto-routing.module';
import { AddProdottoComponent } from './add-prodotto.component';


@NgModule({
  declarations: [
    AddProdottoComponent
  ],
  imports: [
    CommonModule,
    AddProdottoRoutingModule
  ]
})
export class AddProdottoModule { }
