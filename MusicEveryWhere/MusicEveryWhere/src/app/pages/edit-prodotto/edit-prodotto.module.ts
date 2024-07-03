import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProdottoRoutingModule } from './edit-prodotto-routing.module';
import { EditProdottoComponent } from './edit-prodotto.component';


@NgModule({
  declarations: [
    EditProdottoComponent
  ],
  imports: [
    CommonModule,
    EditProdottoRoutingModule
  ]
})
export class EditProdottoModule { }
