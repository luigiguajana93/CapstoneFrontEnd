import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProdottoRoutingModule } from './add-prodotto-routing.module';
import { AddProdottoComponent } from './add-prodotto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddProdottoComponent }
];

@NgModule({
  declarations: [
    AddProdottoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddProdottoRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class AddProdottoModule { }
